import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return req.user;
    }
}
