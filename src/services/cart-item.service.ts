import { AbstractService } from './abstract.service';
import { CartItem } from '../entities/cart-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ItemService } from './item.service';

@Injectable()
export class CartItemService extends AbstractService<CartItem> {
  constructor(
    @InjectRepository(CartItem)
    protected readonly repository: Repository<CartItem>,
    private readonly itemService: ItemService,
  ) {
    super('cart-item');
  }

  protected getQueryBuilder(): SelectQueryBuilder<CartItem> {
    return super.getQueryBuilder().leftJoinAndSelect('cart-item.item', 'item');
  }

  async create(partial: DeepPartial<CartItem>): Promise<CartItem> {
    if (partial.item) await this.itemService.getOne(partial.item.uuid);
    return super.create(partial);
  }
}
