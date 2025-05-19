import {Controller, Get} from '@nestjs/common';
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

	@Get('similar')
	getRandomSimilarProducts():Promise<Item[]> {
		return this.itemsService.getSimilarProducts();
	}

	@Get('random')
	getRandomLocalizedItems(): Promise<LocalizationItemsInterface[]> {
		return this.itemsService.getRandomLocalizedItems();
	}
}
