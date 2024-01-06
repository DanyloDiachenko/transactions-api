import { Module } from "@nestjs/common";
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
    imports: [UserModule, CategoryModule, AuthModule, TransactionModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
