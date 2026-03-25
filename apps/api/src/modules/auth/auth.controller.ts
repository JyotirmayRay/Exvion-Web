import { Controller, Post, Get, Body, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { IsEmail, IsString, MinLength } from "class-validator";

class LoginDto {
  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;
}

class CreateAdminDto {
  @IsString() name: string;
  @IsEmail() email: string;
  @IsString() @MinLength(8) password: string;
}

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  me(@Req() req: any) {
    return this.auth.me(req.user.sub);
  }

  @Post("setup")
  setup(@Body() dto: CreateAdminDto) {
    return this.auth.createAdmin(dto.name, dto.email, dto.password);
  }
}
