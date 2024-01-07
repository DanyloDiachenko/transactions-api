import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(email: string, password: string) {
        const findedUser = await this.userService.findOne(email);

        if (!findedUser) {
            throw new BadRequestException("User not found");
        }

        const isPasswordsMatched = await argon2.verify(
            findedUser.password,
            password,
        );

        if (findedUser && isPasswordsMatched) {
            return findedUser;
        }

        throw new UnauthorizedException("User or password are incorrect");
    }
}
