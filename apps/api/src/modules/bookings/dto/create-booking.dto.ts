import { IsString, IsDateString, IsOptional } from "class-validator";

export class CreateBookingDto {
  @IsString()
  leadId: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  startTimeEnd: string; // for the end of the slot

  @IsString()
  @IsOptional()
  notes?: string;
}
