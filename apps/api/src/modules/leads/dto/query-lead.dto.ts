import { IsOptional, IsString, IsEnum } from "class-validator";
import { Transform } from "class-transformer";
import { LeadStatus } from "@exvion/database";

export class QueryLeadsDto {
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @IsOptional()
  @IsString()
  serviceType?: string;

  @IsOptional()
  @IsString()
  budget?: string;

  @IsOptional()
  @IsString()
  tier?: "high" | "medium" | "low";

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number = 20;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  format?: 'csv' | 'xlsx';

  @IsOptional()
  @IsString()
  columns?: 'all' | 'contact' | 'crm';
}
