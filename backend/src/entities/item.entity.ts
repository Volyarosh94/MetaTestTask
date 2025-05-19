import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	Index,
} from 'typeorm';
import { Category } from './category.entity';
import { Label } from './label.entity';

@Entity()
export class Item {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('jsonb')
	@Index()
	name: { en?: string; fr?: string; ar?: string; uk?: string };

	@Column()
	@Index()
	description: string;

	@Column('text', { array: true })
	images: string[];

	@ManyToMany(() => Label, label => label.items, { eager: true })
	@JoinTable()
	labels: Label[];

	@ManyToOne(() => Category, category => category.items)
	@Index()
	category: Category;

	@Column('float')
	@Index()
	price: number;
}
