import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { IUser } from "../types/types";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	@UseGuards(LocalAuthGuard)
	async login(@Request() req: { user: IUser }) {
		return await this.authService.login(req.user);
	}

	@Get("profile")
	@UseGuards(JwtAuthGuard)
	async getProfile(@Request() req) {
		return req.user;
	}
}
