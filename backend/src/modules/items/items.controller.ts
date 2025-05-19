import {Controller, Get, Param} from '@nestjs/common';
import { ItemsService } from './items.service';
import {Item} from "../../entities";
import {LocalizationItemsInterface} from "../../common/interfaces/localization.items.interface";

@Controller('items')
export class ItemsController {
	constructor(private readonly itemsService: ItemsService) {}

	@Get('seasonal')
	getSeasonalItems(): Promise<Item[]> {
		return this.itemsService.getSeasonalItems();
	}

	@Get(':id/similar')
	getSimilarProducts(@Param('id')id: number):Promise<Item[]> {
		return this.itemsService.getSimilarProducts(id);
	}

	@Get('similar')
	async getRandomSimilarProducts():Promise<Item[]> {
		const randomItem = await this.itemsService.getRandomItem();
		return this.itemsService.getSimilarProducts(randomItem?.id ?? 10);
	}

	@Get('random')
	getRandomLocalizedItems(): Promise<LocalizationItemsInterface[]> {
		return this.itemsService.getRandomLocalizedItems();
	}
}
