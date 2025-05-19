import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {LocalizationItemsInterface} from "../../common/interfaces/localization.items.interface";
import {Category, Item, Label} from "../../entities";

@Injectable()
export class ItemsService {
	constructor(
		@InjectRepository(Item)
		private readonly itemRepository: Repository<Item>,

		@InjectRepository(Label)
		private readonly labelRepository: Repository<Label>,

		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>,
	) {}

	async getSeasonalItems(): Promise<Item[]> {
		return this.itemRepository
			.createQueryBuilder('item')
			.leftJoinAndSelect('item.labels', 'label')
			.where('label.name = :labelName', { labelName: 'seasonal' })
			.andWhere('item.price < :price', { price: 100 })
			.getMany();
	}

	async getSimilarProducts(id: number): Promise<Item[]> {
		const targetItem = await this.itemRepository.findOne({
			where: { id },
			relations: ['labels', 'category', 'category.parent'],
		});

		if (!targetItem) throw new NotFoundException('Item not found');

		const labelIds = targetItem.labels.map(l => l.id);
		const categoryId = targetItem.category.id;

		const countInCategory = await this.itemRepository.count({
			where: { category: { id: categoryId } },
		});

		const categoriesToSearch = countInCategory >= 10
			? [categoryId]
			: [categoryId, targetItem.category.parent?.id].filter(Boolean);

		const similarItems = await this.itemRepository
			.createQueryBuilder('item')
			.leftJoinAndSelect('item.labels', 'label')
			.leftJoinAndSelect('item.category', 'category')
			.where('item.id != :id', { id })
			.andWhere('item.categoryId IN (:...categories)', { categories: categoriesToSearch })
			.andWhere(labelIds.length > 0 ? 'label.id IN (:...labelIds)' : 'TRUE', { labelIds })
			.orderBy('ABS(item.price - :price)', 'ASC')
			.setParameter('price', targetItem.price)
			.limit(5)
			.getMany();

		return similarItems;
	}

	async getRandomLocalizedItems(): Promise<LocalizationItemsInterface[]> {
		const items = await this.itemRepository
			.createQueryBuilder('item')
			.select([
				'item.id',
				`
    CASE 
      WHEN item.name->>'ar' IS NOT NULL AND item.name->>'ar' <> '' 
        THEN item.name->>'ar' 
      ELSE item.name->>'en' 
    END AS name
    `
			])
			.orderBy('RANDOM()')
			.limit(5)
			.getRawMany();

		return items;
	}

	async getRandomItem(): Promise<Item | null> {
		return this.itemRepository
			.createQueryBuilder('item')
			.orderBy('RANDOM()')
			.limit(1)
			.getOne();
	}

}
