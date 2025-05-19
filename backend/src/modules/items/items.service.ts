import { Injectable } from '@nestjs/common';
import { ItemsRepository } from './items.repositoty';
import { Item } from '../../entities';
import { LocalizationItemsInterface } from '../../common/interfaces/localization.items.interface';

@Injectable()
export class ItemsService {
	constructor(private readonly itemsRepository: ItemsRepository) {}

	async getSeasonalItems(): Promise<Item[]> {
		return this.itemsRepository.getSeasonalItems();
	}

	async getSimilarProducts(id: number): Promise<Item[]> {
		return this.itemsRepository.getSimilarProducts(id);
	}

	async getRandomLocalizedItems(): Promise<LocalizationItemsInterface[]> {
		return this.itemsRepository.getRandomLocalizedItems();
	}

	async getRandomItem(): Promise<Item | null> {
		return this.itemsRepository.getRandomItem();
	}
}
