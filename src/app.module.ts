import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { CategoryModule } from "./category/category.module";
import { AuthModule } from "./auth/auth.module";
import { TransactionModule } from "./transaction/transaction.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { parse } from "pg-connection-string";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				const databaseUrl = configService.get("DATABASE_URL");
				const connectionOptions = parse(databaseUrl);

				return {
					type: "postgres", // Assuming you are using Postgres
					host: connectionOptions.host,
					port: parseInt(connectionOptions.port),
					username: connectionOptions.user,
					password: connectionOptions.password,
					database: connectionOptions.database,
					ssl: connectionOptions.ssl
						? { rejectUnauthorized: false }
						: false, // Adjust SSL based on your DB's requirement
					synchronize: true, // Be careful with this in production
					autoLoadEntities: true,
				};
			},
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
