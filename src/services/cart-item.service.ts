import { AbstractService } from './abstract.service';
import { CartItem } from '../entities/cart-item.entity';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import {
  Connection,
  DeepPartial,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ItemService } from './item.service';
import { UUID } from '../utils/uuid.type';
import { Item } from '../entities/item.entity';

@Injectable()
export class CartItemService extends AbstractService<CartItem> {
  constructor(
    @InjectRepository(CartItem)
    protected readonly repository: Repository<CartItem>,
    private readonly itemService: ItemService,
    @InjectConnection()
    private readonly connection: Connection,
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

  async shop(uuid: UUID): Promise<void> {
    await this.connection.transaction(async (entityManager) => {
      const cartItemRepository =
        entityManager.getRepository<CartItem>(CartItem);
      const itemRepository = entityManager.getRepository<Item>(Item);
      const itemService = new ItemService(itemRepository);
      const cartItemService = new CartItemService(
        cartItemRepository,
        itemService,
        this.connection,
      );

      const cartItem = await cartItemService.getOne(uuid);
      const item = await itemService.getOne(cartItem.item.uuid);

      if (cartItem.isShopped) return;

      const newItemAmount = item.amount + cartItem.amount;

      await Promise.all([
        await cartItemService.update(cartItem.uuid, { isShopped: true }),
        await itemService.update(item.uuid, { amount: newItemAmount }),
      ]);
    });
  }
}
