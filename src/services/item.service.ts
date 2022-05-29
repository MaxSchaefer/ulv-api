import { AbstractService } from './abstract.service';
import { Item } from '../entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemService extends AbstractService<Item> {
  constructor(
    @InjectRepository(Item) protected readonly repository: Repository<Item>,
  ) {
    super('Item');
  }
}
