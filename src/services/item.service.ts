import { AbstractService } from './abstract.service';
import { Item } from '../entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemService extends AbstractService<Item> {
  constructor(
    @InjectRepository(Item) protected readonly repository: Repository<Item>,
  ) {
    super('item');
  }

  protected getQueryBuilder(): SelectQueryBuilder<Item> {
    return super
      .getQueryBuilder()
      .leftJoinAndSelect('item.place', 'place')
      .leftJoinAndSelect('item.nutrients', 'nutrients');
  }

  async getOneByName(name: string): Promise<Item | undefined> {
    const items = await this.getQueryBuilder()
      .where('item.name = :name', { name: name })
      .getMany();
    return items.length === 1 ? items[0] : undefined;
  }
}
