import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from "@nestjs/common";
import { PrismaClient } from "@exvion/database";

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      if (!process.env.DATABASE_URL) {
        this.logger.warn("DATABASE_URL is not configured. Database connection skipped.");
        return;
      }
      await this.$connect();
      this.logger.log("Database connected successfully.");
    } catch (err: any) {
      this.logger.warn(`Database connection could not be established: ${err?.message || err}. Database features will be unavailable.`);
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch {
      // Ignore disconnect errors during teardown
    }
  }
}
