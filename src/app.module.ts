import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { CategoryModule } from "./category/category.module";
import { AuthModule } from "./auth/auth.module";
import { TransactionModule } from "./transaction/transaction.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				host: configService.get("DB_HOST"),
				port: configService.get<number>("DB_PORT"),
				username: configService.get("DB_USERNAME"),
				password: configService.get("DB_PASSWORD"),
				database: configService.get("DB_NAME"),
				synchronize: true,
				autoLoadEntities: true,
			}),
			inject: [ConfigService],
		}),
		UserModule,
		CategoryModule,
		AuthModule,
		TransactionModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
