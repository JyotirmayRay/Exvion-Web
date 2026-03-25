import {
  Controller, Get, Post, Patch, Param, Body,
  Query, UseGuards, Res, HttpCode, Delete,
  UseInterceptors, UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { type Response } from "express";
import { LeadsService } from "./leads.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadStatusDto, AddNoteDto } from "./dto/update-lead.dto";
import { QueryLeadsDto } from "./dto/query-lead.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";
import { LeadStatus } from "@prisma/client";
import * as Papa from "papaparse";

@Controller("leads")
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post("create")
  @HttpCode(201)
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  create(@Body() dto: CreateLeadDto) {
    return this.leadsService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query: QueryLeadsDto) {
    return this.leadsService.findAll(query);
  }

  @Get("count")
  @UseGuards(JwtAuthGuard)
  getCount(@Query() query: QueryLeadsDto) {
    return this.leadsService.count(query);
  }

  @Get("stats")
  @UseGuards(JwtAuthGuard)
  getDashboardStats() {
    return this.leadsService.getDashboardStats();
  }

  @Get("export/csv")
  @UseGuards(JwtAuthGuard)
  async exportCsv(@Query() query: QueryLeadsDto, @Res() res: Response) {
    const result = await this.leadsService.exportCsv(query);
    const isXlsx = query.format === 'xlsx';
    
    res.setHeader(
      "Content-Type", 
      isXlsx ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "text/csv"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=exvion-leads-${Date.now()}.${isXlsx ? 'xlsx' : 'csv'}`
    );
    res.send(result);
  }

  @Post("import")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  async importLeads(@UploadedFile() file: Express.Multer.File) {
    const csvString = file.buffer.toString("utf8");
    const parsed = Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
    });

    return this.leadsService.importFromCsv(parsed.data);
  }

  @Patch("bulk/status")
  @UseGuards(JwtAuthGuard)
  bulkUpdateStatus(
    @Body() dto: { ids: string[]; status: LeadStatus },
  ) {
    return this.leadsService.bulkUpdateStatus(dto.ids, dto.status);
  }

  @Delete("bulk")
  @UseGuards(JwtAuthGuard)
  bulkDelete(@Body() dto: { ids: string[] }) {
    return this.leadsService.bulkDelete(dto.ids);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: string) {
    return this.leadsService.findOne(id);
  }

  @Patch(":id/status")
  @UseGuards(JwtAuthGuard)
  updateStatus(
    @Param("id") id: string,
    @Body() dto: UpdateLeadStatusDto,
  ) {
    return this.leadsService.updateStatus(id, dto);
  }

  @Post(":id/notes")
  @UseGuards(JwtAuthGuard)
  addNote(
    @Param("id") id: string,
    @Body() dto: AddNoteDto,
  ) {
    return this.leadsService.addNote(id, dto);
  }
}
