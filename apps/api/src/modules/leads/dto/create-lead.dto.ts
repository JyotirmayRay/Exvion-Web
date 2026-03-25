import {
  IsString, IsEmail, IsOptional, IsArray,
  IsNumber, MinLength, MaxLength,
} from "class-validator";
import { Type } from "class-transformer";

export class LeadAnswerDto {
  @IsString()
  question: string;

  @IsString()
  answer: string;
}

export class CreateLeadDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  serviceType: string;

  @IsOptional()
  @IsString()
  projectType?: string;

  @IsOptional()
  @IsString()
  stage?: string;

  @IsOptional()
  @IsString()
  budget?: string;

  @IsOptional()
  @IsString()
  timeline?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsArray()
  @Type(() => LeadAnswerDto)
  answers?: LeadAnswerDto[];

  @IsOptional()
  @IsString()
  features?: string;
}
