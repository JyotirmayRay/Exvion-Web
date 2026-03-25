import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";
import { format } from "date-fns";

@Injectable()
export class NotificationsService {
  private resend: Resend;
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private config: ConfigService) {
    this.resend = new Resend(this.config.get("RESEND_API_KEY"));
  }

  async onLeadCreated(
    lead: any,
    tier: "high" | "medium" | "low",
    reasons: string[],
  ) {
    await Promise.allSettled([
      this.sendClientConfirmation(lead),
      this.sendAdminAlert(lead, tier, reasons),
      this.sendWhatsAppToClient(lead),
      tier === "high" ? this.sendAdminWhatsApp(lead, tier) : Promise.resolve(),
    ]);
  }

  async sendBookingConfirmation(booking: any) {
    try {
      if (!this.config.get("RESEND_API_KEY")) return;
      
      const date = format(new Date(booking.startTime), "EEEE, MMMM do");
      const time = format(new Date(booking.startTime), "h:mm a");

      await this.resend.emails.send({
        from: "Exvion Global <hello@exvionglobal.com>",
        to: booking.lead.email,
        subject: `Confirmed: Strategy Session for ${booking.lead.serviceType}`,
        html: this.bookingEmailTemplate(booking, date, time),
      });
      this.logger.log(`Booking confirmation sent to ${booking.lead.email}`);
    } catch (err) {
      this.logger.error("Booking email failed:", err);
    }
  }

  async sendClientConfirmation(lead: any) {
    try {
      if (!this.config.get("RESEND_API_KEY")) {
        this.logger.warn("RESEND_API_KEY not set, skipping email");
        return;
      }
      await this.resend.emails.send({
        from: "Exvion Global <hello@exvionglobal.com>",
        to: lead.email,
        subject: "Your Project Request Received – Exvion Global",
        html: this.clientEmailTemplate(lead),
      });
      this.logger.log(`Client confirmation sent to ${lead.email}`);
    } catch (err) {
      this.logger.error("Client email failed:", err);
    }
  }

  async sendAdminAlert(
    lead: any,
    tier: string,
    reasons: string[],
  ) {
    try {
      if (!this.config.get("RESEND_API_KEY")) return;
      await this.resend.emails.send({
        from: "Exvion Lead System <leads@exvionglobal.com>",
        to: this.config.get<string>("ADMIN_EMAIL")!,
        subject: `New ${tier.toUpperCase()} Value Lead: ${lead.name} — ${lead.serviceType}`,
        html: this.adminEmailTemplate(lead, tier, reasons),
      });
      this.logger.log(`Admin alert sent for lead ${lead.id}`);
    } catch (err) {
      this.logger.error("Admin email failed:", err);
    }
  }

  async sendWhatsAppToClient(lead: any) {
    try {
      if (!this.config.get("WHATSAPP_API_KEY")) {
        this.logger.warn("WHATSAPP_API_KEY not set, skipping");
        return;
      }
      const message = `Hi ${lead.name}, this is Exvion Global.\n\nWe received your project request for *${lead.serviceType}* and our team is reviewing it.\n\nWe'll get back to you within 24 hours with a clear plan.\n\nIf urgent, reply to this message directly.\n\n– Team Exvion`;

      await this.sendMsg91WhatsApp(lead.phone, message);
      this.logger.log(`WhatsApp sent to ${lead.phone}`);
    } catch (err) {
      this.logger.error("Client WhatsApp failed:", err);
    }
  }

  async sendAdminWhatsApp(lead: any, tier: string) {
    try {
      if (!this.config.get("WHATSAPP_API_KEY")) return;
      const message = `[URGENT] *HIGH VALUE LEAD*\n\nName: ${lead.name}\nService: ${lead.serviceType}\nBudget: ${lead.budget}\nTimeline: ${lead.timeline}\nScore: ${lead.score}\nPhone: ${lead.phone}\nEmail: ${lead.email}\n\nReply immediately!`;

      await this.sendMsg91WhatsApp(
        this.config.get<string>("ADMIN_WHATSAPP")!,
        message,
      );
    } catch (err) {
      this.logger.error("Admin WhatsApp failed:", err);
    }
  }

  private async sendMsg91WhatsApp(phone: string, message: string) {
    const cleanPhone = phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("91")
      ? cleanPhone
      : `91${cleanPhone}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      authkey: this.config.get<string>("WHATSAPP_API_KEY")!,
    };

    const res = await fetch("https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/", {
      method: "POST",
      headers,
      body: JSON.stringify({
        integrated_number: this.config.get("WHATSAPP_SENDER"),
        content_type: "template",
        payload: {
          to: formattedPhone,
          type: "text",
          message: { body: message },
        },
      }),
    });

    if (!res.ok) throw new Error(`MSG91 error: ${res.status}`);
  }

  private clientEmailTemplate(lead: any): string {
    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0A0A0F;font-family:sans-serif;">
  <div style="max-width:580px;margin:0 auto;padding:40px 20px;">
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px;">
      <h1 style="color:#fff;font-size:24px;font-weight:700;margin:0 0 8px;">Request Received</h1>
      <p style="color:#A0A0B0;font-size:15px;margin:0 0 24px;">Hi ${lead.name}, thanks for reaching out to Exvion Global.</p>
      <div style="background:rgba(251,78,0,0.08);border:1px solid rgba(251,78,0,0.2);border-radius:12px;padding:20px;margin-bottom:24px;">
        <p style="color:#FB4E00;font-size:12px;font-weight:600;text-transform:uppercase;margin:0 0 12px;">Your Request Summary</p>
        <p style="color:#fff;margin:4px 0;font-size:14px;">📌 Service: <strong>${lead.serviceType}</strong></p>
        <p style="color:#fff;margin:4px 0;font-size:14px;">💰 Budget: <strong>${lead.budget || "To discuss"}</strong></p>
      </div>
      <p style="color:#A0A0B0;font-size:15px;line-height:1.7;">Our team will get back to you within 24 hours.</p>
    </div>
  </div>
</body>
</html>`;
  }

  private bookingEmailTemplate(booking: any, date: string, time: string): string {
    const meetLinkHtml = booking.meetLink 
      ? `<p style="color:#A0A0B0;font-size:14px;margin:8px 0 0;">Meeting Link: <a href="${booking.meetLink}" style="color:#FB4E00;text-decoration:none;font-weight:700;">Join Google Meet</a></p>`
      : `<p style="color:#A0A0B0;font-size:14px;margin:8px 0 0;">Platform: <strong>Google Meet</strong></p>`;

    const instructionText = booking.meetLink
      ? `Your unique Google Meet link is above. A calendar invitation has also been added to your email.`
      : `A calendar invitation with the meeting link will be sent to this email address within the next few minutes.`;

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0A0A0F;font-family:sans-serif;">
  <div style="max-width:580px;margin:0 auto;padding:40px 20px;">
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px;">
      <h1 style="color:#fff;font-size:24px;font-weight:700;margin:0 0 8px;">Call Confirmed</h1>
      <p style="color:#A0A0B0;font-size:15px;margin:0 0 24px;">Hi ${booking.lead.name}, your strategy session is locked in.</p>
      
      <div style="border-left:4px solid #FB4E00;background:rgba(251,78,0,0.05);padding:24px;margin-bottom:24px;border-radius:0 12px 12px 0;">
        <p style="color:#FB4E00;font-size:12px;font-weight:700;text-transform:uppercase;margin:0 0 8px;">Meeting Details</p>
        <p style="color:#fff;font-size:18px;font-weight:700;margin:0;">${date} @ ${time}</p>
        ${meetLinkHtml}
      </div>

      <p style="color:#A0A0B0;font-size:14px;line-height:1.6;">${instructionText}</p>
      
      <div style="margin-top:40px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);">
        <p style="color:#fff;font-size:14px;font-weight:700;margin:0 0 4px;">Exvion Global</p>
        <p style="color:#FB4E00;font-size:12px;font-weight:600;margin:0;">Advanced Agentic Coding & AI Systems</p>
      </div>
    </div>
  </div>
</body>
</html>`;
  }

  private adminEmailTemplate(lead: any, tier: string, reasons: string[]): string {
    const tierColors = { high: "#22c55e", medium: "#f59e0b", low: "#94a3b8" };
    const tierColor = tierColors[tier as keyof typeof tierColors];

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0A0A0F;font-family:sans-serif;">
  <div style="max-width:580px;margin:0 auto;padding:40px 20px;">
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px;">
      <h2 style="color:#fff;margin:0;font-size:20px;">New Lead</h2>
      <span style="background:${tierColor}22;color:${tierColor};padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;">${tier.toUpperCase()} value</span>
      <div style="margin:20px 0;color:#fff;">
        <p>Name: <strong>${lead.name}</strong></p>
        <p>Email: ${lead.email}</p>
        <p>Phone: ${lead.phone}</p>
      </div>
      <div style="background:rgba(251,78,0,0.06);border-radius:12px;padding:20px;">
        <p style="color:#fff;">Service: <strong>${lead.serviceType}</strong></p>
        <p style="color:${tierColor}">Score: <strong>${lead.score} pts</strong></p>
      </div>
      <div style="margin-top:20px;">
        ${reasons.map((r) => `<p style="color:#A0A0B0;font-size:13px;">✓ ${r}</p>`).join("")}
      </div>
    </div>
  </div>
</body>
</html>`;
  }
}
