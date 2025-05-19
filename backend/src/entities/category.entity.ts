import {Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Item} from "./item.entity";

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Index()
	name: string;

	@ManyToOne(() => Category, category => category.subcategories, { nullable: true })
	parent: Category;

	@OneToMany(() => Category, category => category.parent)
	subcategories: Category[];

	@OneToMany(() => Item, item => item.category)
	items: Item[];
}
