import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadStatusDto, AddNoteDto } from "./dto/update-lead.dto";
import { QueryLeadsDto } from "./dto/query-lead.dto";
import { calculateLeadScore } from "./scoring.engine";
import { LeadStatus } from "@exvion/database";

@Injectable()
export class LeadsService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  async create(dto: CreateLeadDto) {
    // Calculate score
    const { score, tier, reasons } = calculateLeadScore({
      budget: dto.budget,
      timeline: dto.timeline,
      stage: dto.stage,
      features: dto.features,
      projectType: dto.projectType,
    });

    // Save lead to DB
    const lead = await this.prisma.lead.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        serviceType: dto.serviceType,
        projectType: dto.projectType,
        stage: dto.stage,
        budget: dto.budget,
        timeline: dto.timeline,
        description: dto.description,
        source: dto.source || "website",
        score,
        status: LeadStatus.NEW,
        answers: dto.answers?.length
          ? {
              create: dto.answers.map((a) => ({
                question: a.question,
                answer: a.answer,
              })),
            }
          : undefined,
      },
      include: { answers: true },
    });

    // Fire all notifications async
    this.notifications.onLeadCreated(lead, tier, reasons).catch(
      (err) => console.error("Notification error:", err)
    );

    return {
      success: true,
      message: "Your request has been received. We will contact you within 24 hours.",
      leadId: lead.id,
    };
  }

  async findAll(query: QueryLeadsDto) {
    const { where, skip, limit } = this.buildWhereClause(query);

    const [leads, total] = await this.prisma.$transaction([
      this.prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ score: "desc" }, { createdAt: "desc" }],
        include: { answers: true, notes: true },
      }),
      this.prisma.lead.count({ where }),
    ]);

    return {
      data: leads,
      total,
      page: query.page || 1,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async count(query: QueryLeadsDto) {
    const { where } = this.buildWhereClause(query);
    return this.prisma.lead.count({ where });
  }

  private buildWhereClause(query: QueryLeadsDto) {
    const { status, serviceType, budget, tier, page = 1,
      limit = 20, search } = query;
    const skip = (page - 1) * limit;

    let scoreFilter = {};
    if (tier === "high") scoreFilter = { gte: 70 };
    else if (tier === "medium") scoreFilter = { gte: 35, lt: 70 };
    else if (tier === "low") scoreFilter = { lt: 35 };

    const where: any = {
      ...(status && { status }),
      ...(serviceType && { serviceType }),
      ...(budget && { budget }),
      ...(tier && { score: scoreFilter }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phone: { contains: search } },
        ],
      }),
    };

    return { where, skip, limit };
  }

  async findOne(id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: { answers: true, notes: { orderBy: { createdAt: "desc" } } },
    });
    if (!lead) throw new NotFoundException("Lead not found");
    return lead;
  }

  async updateStatus(id: string, dto: UpdateLeadStatusDto) {
    await this.findOne(id);
    return this.prisma.lead.update({
      where: { id },
      data: { status: dto.status },
    });
  }

  async bulkUpdateStatus(ids: string[], status: LeadStatus) {
    return this.prisma.lead.updateMany({
      where: { id: { in: ids } },
      data: { status },
    });
  }

  async bulkDelete(ids: string[]) {
    return this.prisma.lead.deleteMany({
      where: { id: { in: ids } },
    });
  }

  async addNote(id: string, dto: AddNoteDto) {
    await this.findOne(id);
    return this.prisma.note.create({
      data: { 
        leadId: id, 
        content: dto.content,
        type: dto.type || "note",
        metadata: dto.metadata || {},
      },
    });
  }

  async getDashboardStats() {
    const [total, newLeads, qualified, won,
      highValue, today] = await this.prisma.$transaction([
      this.prisma.lead.count(),
      this.prisma.lead.count({ where: { status: "NEW" } }),
      this.prisma.lead.count({ where: { status: "QUALIFIED" } }),
      this.prisma.lead.count({ where: { status: "WON" } }),
      this.prisma.lead.count({ where: { score: { gte: 70 } } }),
      this.prisma.lead.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ]);

    const conversionRate = total > 0
      ? ((won / total) * 100).toFixed(1)
      : "0";

    return {
      total, newLeads, qualified, won,
      highValue, today, conversionRate,
    };
  }

  async exportCsv(query: QueryLeadsDto) {
    const { where } = this.buildWhereClause(query);
    const leads = await this.prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { answers: true },
    });

    // Handle columns
    let headers: string[] = [];
    let dynamicHeaders: string[] = [];
    
    if (query.columns === 'contact') {
      headers = ["ID", "Name", "Email", "Phone", "Service Type", "Score", "Status", "Created Date"];
    } else if (query.columns === 'crm') {
      headers = ["First Name", "Last Name", "Email", "Phone", "Company", "Lead Source", "Lead Status", "Industry"];
    } else {
      // Default: All columns
      const allQuestions = new Set<string>();
      leads.forEach(l => l.answers.forEach(a => allQuestions.add(a.question)));
      dynamicHeaders = Array.from(allQuestions);
      headers = [
        "ID", "Name", "Email", "Phone", "Company",
        "Service Type", "Budget", "Timeline", "Stage",
        "Score", "Score Tier", "Status", "Source",
        "Description", "Created Date", "Last Updated",
        ...dynamicHeaders
      ];
    }

    const rows = leads.map((l: any) => {
      const scoreTier = l.score >= 70 ? "HIGH" : l.score >= 35 ? "MEDIUM" : "LOW";
      
      if (query.columns === 'contact') {
        return [l.id, l.name, l.email, l.phone, l.serviceType, l.score, l.status, l.createdAt.toISOString()];
      }
      
      if (query.columns === 'crm') {
        const [first, ...last] = l.name.split(" ");
        return [first, last.join(" "), l.email, l.phone, l.company || "", "Exvion Website", l.status, "Technology"];
      }

      const staticData = [
        l.id, l.name, l.email, l.phone, l.company || "",
        l.serviceType, l.budget || "", l.timeline || "", l.stage || "",
        l.score || 0, scoreTier, l.status, l.source || "",
        (l.description || "").replace(/\n/g, " "), 
        l.createdAt.toISOString(), l.updatedAt.toISOString(),
      ];

      const dynamicData = dynamicHeaders.map(q => {
        const ans = l.answers.find(a => a.question === q);
        return ans ? ans.answer : "";
      });

      return [...staticData, ...dynamicData];
    });

    if (query.format === 'xlsx') {
      const { utils, write } = require('xlsx');
      const ws = utils.aoa_to_sheet([headers, ...rows]);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Leads");
      const buf = write(wb, { type: 'buffer', bookType: 'xlsx' });
      return buf;
    }

    // Default: CSV
    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.map(v => 
        typeof v === 'string' ? `"${v.replace(/"/g, '""')}"` : v
      ).join(","))
    ].join("\n");
    
    return csvContent;
  }

  async importFromCsv(rows: any[]) {
    const results = {
      imported: 0,
      duplicates: 0,
      errors: 0,
      errorDetails: [] as string[],
    };

    for (const row of rows) {
      try {
        if (!row.email) {
          results.errors++;
          results.errorDetails.push("Missing email for row");
          continue;
        }

        const existing = await this.prisma.lead.findFirst({
          where: { email: { equals: row.email, mode: "insensitive" } },
        });

        if (existing) {
          results.duplicates++;
          continue;
        }

        const { score } = calculateLeadScore({
          budget: row.budget,
          serviceType: row.serviceType,
        } as any);

        await this.prisma.lead.create({
          data: {
            name: row.name,
            email: row.email,
            phone: row.phone,
            company: row.company,
            serviceType: row.serviceType,
            budget: row.budget,
            description: row.description,
            source: row.source || "import",
            score,
            status: "NEW",
          } as any,
        });

        results.imported++;
      } catch (err) {
        results.errors++;
        results.errorDetails.push(`Row ${row.email || 'unknown'}: ${err.message}`);
      }
    }

    return results;
  }
}
