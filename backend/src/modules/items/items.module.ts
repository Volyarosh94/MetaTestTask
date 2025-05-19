import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category, Item, Label} from "../../entities";
import {ItemsRepository} from "./items.repositoty";

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepository],
  imports: [TypeOrmModule.forFeature([Item, Label, Category])]
})
export class ItemsModule {}
