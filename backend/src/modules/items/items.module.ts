import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category, Item, Label} from "../../entities";

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [TypeOrmModule.forFeature([Item, Label, Category])]
})
export class ItemsModule {}
