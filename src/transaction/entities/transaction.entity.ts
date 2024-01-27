import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class Transaction {
	@PrimaryGeneratedColumn({ name: "transaction_id" })
	id: number;

	@Column()
	title: string;

	@Column()
	amount: number;

	@Column({ nullable: true })
	type: string;

	@ManyToOne(() => User, (user) => user.transactions)
	@JoinColumn({ name: "user_id" })
	user: User;

	@ManyToOne(() => Category, (category) => category.transactions, {
		onDelete: "SET NULL",
	})
	@JoinColumn({ name: "category_id" })
	category: Category;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updateAt: Date;
}
