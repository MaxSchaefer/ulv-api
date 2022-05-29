import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { CreateItemDto, UpdateItemDto } from '../dtos/item.dto';
import { Item } from '../entities/item.entity';
import { UUID } from '../utils/uuid.type';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() dto: CreateItemDto): Promise<Item> {
    return this.itemService.create(dto);
  }

  @Get()
  getAll() {
    return this.itemService.getAll();
  }

  @Get(':uuid')
  getOne(@Param('uuid') uuid: UUID) {
    return this.itemService.getOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: UUID, @Body() dto: UpdateItemDto): Promise<Item> {
    return this.itemService.update(uuid, dto);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: UUID): Promise<void> {
    return this.itemService.delete(uuid);
  }
}
