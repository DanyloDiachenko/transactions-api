import { Transaction } from "../../transaction/entities/transaction.entity";
import { User } from "../../user/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn({ name: "category_id" })
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => User, (user) => user.categories, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "user_id" })
    user: User;

    @OneToMany(() => Transaction, (transaction) => transaction.category)
    transactions: Transaction[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
