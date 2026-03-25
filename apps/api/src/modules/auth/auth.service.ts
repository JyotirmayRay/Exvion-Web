import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma/prisma.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.adminUser.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException("Invalid credentials");

    const token = this.jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }

  async createAdmin(name: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 12);
    return this.prisma.adminUser.create({
      data: { name, email, password: hashed },
      select: { id: true, name: true, email: true, role: true },
    });
  }

  async me(userId: string) {
    return this.prisma.adminUser.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true },
    });
  }
}
