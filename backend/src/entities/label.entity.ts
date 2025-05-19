import {Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Item} from "./item.entity";

@Entity()
export class Label {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Index()
	name: string;

	@ManyToMany(() => Item, item => item.labels)
	items: Item[];
}
