import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { PrismaModule } from "./prisma/prisma.module";
import { LeadsModule } from "./modules/leads/leads.module";
import { AuthModule } from "./modules/auth/auth.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { HealthController } from "./health.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    PrismaModule,
    LeadsModule,
    AuthModule,
    NotificationsModule,
    BookingsModule,
    SettingsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
