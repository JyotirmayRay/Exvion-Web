import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { NotificationsService } from "../notifications/notifications.service";
import { SettingsService } from "../settings/settings.service";
import { addMinutes, startOfDay, endOfDay, format, isAfter, isBefore, addDays } from "date-fns";
import { google } from "googleapis";

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly settings: SettingsService,
  ) {}

  async create(dto: CreateBookingDto) {
    const lead = await this.prisma.lead.findUnique({
      where: { id: dto.leadId },
    });

    if (!lead) {
      throw new BadRequestException("Lead not found");
    }

    // Basic overlap check
    const startTime = new Date(dto.startTime);
    const endTime = new Date(dto.startTimeEnd);

    const overlap = await this.prisma.booking.findFirst({
      where: {
        AND: [
          { startTime: { lt: endTime } },
          { endTime: { gt: startTime } },
          { status: { not: "CANCELLED" } },
        ],
      },
    });

    if (overlap) {
      throw new BadRequestException("This time slot is no longer available.");
    }

    let meetLink = null;

    try {
      const gJsonSetting = await this.settings.getSetting("GOOGLE_SERVICE_ACCOUNT_JSON");
      const gEmailSetting = await this.settings.getSetting("GOOGLE_CALENDAR_ID");

      if (gJsonSetting && gEmailSetting) {
        const credentials = JSON.parse(gJsonSetting);
        const auth = new google.auth.GoogleAuth({
          credentials,
          scopes: ['https://www.googleapis.com/auth/calendar.events'],
        });

        const calendar = google.calendar({ version: 'v3', auth });

        const event = {
          summary: `Strategy Call: ${lead.name}`,
          description: `Exvion Global - Service Inquiry: ${lead.serviceType}\nLead Email: ${lead.email}`,
          start: { dateTime: startTime.toISOString() },
          end: { dateTime: endTime.toISOString() },
          conferenceData: {
            createRequest: {
              requestId: `exvion-${lead.id}-${Date.now()}`,
              conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
          },
        };

        const res = await calendar.events.insert({
          calendarId: gEmailSetting,
          conferenceDataVersion: 1,
          requestBody: event,
        });

        const eventData = res.data as any;
        if (eventData.hangoutLink) {
          meetLink = eventData.hangoutLink;
        }
      }
    } catch (err) {
      console.error("Failed to generate Google Meet link", err);
    }

    const booking = await this.prisma.booking.create({
      data: {
        leadId: dto.leadId,
        startTime,
        endTime,
        notes: dto.notes,
        status: "CONFIRMED",
        ...(meetLink ? { meetLink } : {}),
      },
      include: { lead: true },
    });

    // Notify Admin & Lead
    await this.notifications.sendBookingConfirmation(booking);

    return booking;
  }

  async findAll() {
    return this.prisma.booking.findMany({
      include: { lead: true },
      orderBy: { startTime: "desc" },
    });
  }

  async getAvailableSlots(dateStr: string) {
    const targetDate = new Date(dateStr);
    const start = startOfDay(targetDate);
    const end = endOfDay(targetDate);

    const existingBookings = await this.prisma.booking.findMany({
      where: {
        startTime: { gte: start, lte: end },
        status: { not: "CANCELLED" },
      },
    });

    // Define working hours (e.g., 9 AM to 6 PM)
    const slots: { start: string; end: string }[] = [];
    let currentSlot = new Date(start);
    currentSlot.setHours(9, 0, 0, 0);
    const workEnd = new Date(start);
    workEnd.setHours(18, 0, 0, 0);

    const now = new Date();

    while (isBefore(currentSlot, workEnd)) {
      const slotEnd = addMinutes(currentSlot, 30);
      
      const isBooked = existingBookings.some(b => 
        (b.startTime < slotEnd && b.endTime > currentSlot)
      );

      const isPast = isBefore(currentSlot, now);

      if (!isBooked && !isPast) {
        slots.push({
          start: currentSlot.toISOString(),
          end: slotEnd.toISOString(),
        });
      }
      currentSlot = slotEnd;
    }

    return slots;
  }
}
