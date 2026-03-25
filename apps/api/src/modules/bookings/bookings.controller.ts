import { Controller, Get, Post, Body, Query, UseGuards } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";

@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post("create")
  create(@Body() dto: CreateBookingDto) {
    return this.bookingsService.create(dto);
  }

  @Get("available")
  getAvailableSlots(@Query("date") date: string) {
    return this.bookingsService.getAvailableSlots(date);
  }

  @Get("admin/list")
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.bookingsService.findAll();
  }
}
