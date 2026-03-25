import { IsEnum, IsString, IsOptional } from "class-validator";
import { LeadStatus } from "@exvion/database";

export class UpdateLeadStatusDto {
  @IsEnum(LeadStatus)
  status: LeadStatus;
}

export class AddNoteDto {
  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsOptional()
  metadata?: any;
}
