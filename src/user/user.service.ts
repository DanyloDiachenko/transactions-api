import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as argon2 from "argon2";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.userRepository.findOne({
            where: {
                email: createUserDto.email,
            },
        });

        if (existingUser)
            throw new BadRequestException("This email already exist");

        const createdUser = await this.userRepository.save({
            email: createUserDto.email,
            password: await argon2.hash(createUserDto.password),
        });

        return createdUser;
    }

    async findOne(email: string) {
        return await this.userRepository.findOne({
            where: {
                email: email,
            },
        });
    }
}
