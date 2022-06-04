import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createApp } from './utils';
import { CartItemService } from '../src/services/cart-item.service';
import { CreateCartItemDto } from '../src/dtos/cart-item.dto';
import { ItemService } from '../src/services/item.service';
import { CreateItemDto } from '../src/dtos/item.dto';

describe('CartItem', () => {
  let app: INestApplication;
  let req: request.SuperTest<request.Test>;
  let itemService: ItemService;
  let cartItemService: CartItemService;

  beforeEach(async () => {
    const a = await createApp();
    app = a.app;
    req = a.req;
    itemService = app.get(ItemService);
    cartItemService = app.get(CartItemService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('Create cart-item', async () => {
    const item = await itemService.create({ name: 'Apfel' });
    const dto: CreateCartItemDto = { amount: 1, item: { uuid: item.uuid } };
    const res = req.post('/cart-items').send(dto).expect(201);
    const { body } = await res;
    expect(body).toEqual(
      expect.objectContaining({ amount: dto.amount, isShopped: false }),
    );
    expect(body.item).toEqual(expect.objectContaining({ uuid: item.uuid }));
  });

  it('Create cart-item without existing item', async () => {
    const dto: CreateCartItemDto = { amount: 1, newItem: { name: 'Pizza' } };
    const res = req.post('/cart-items').send(dto).expect(201);
    const { body } = await res;
    expect(body).toEqual(
      expect.objectContaining({ amount: dto.amount, isShopped: false }),
    );
    expect(body.item).toEqual(
      expect.objectContaining({ name: dto.newItem.name }),
    );
  });

  it('Read all cart-items', async () => {
    const item1 = await itemService.create({ name: 'Apfel' });
    const item2 = await itemService.create({ name: 'Banane' });
    await Promise.all([
      cartItemService.create({ item: { uuid: item1.uuid }, amount: 1 }),
      cartItemService.create({ item: { uuid: item2.uuid }, amount: 2 }),
    ]);

    const res = req.get('/cart-items').expect(200);
    const { body } = await res;

    expect(body).toHaveLength(2);
  });

  it('Delete cart-item', async () => {
    const item = await itemService.create({ name: 'Pizza' });
    const cartItem = await cartItemService.create({
      item: { uuid: item.uuid },
      amount: 1,
    });

    return req.delete(`/cart-items/${cartItem.uuid}`).expect(200);
  });

  it('Shop a cart-item', async () => {
    const createItemDto: CreateItemDto = { name: 'Pizza', amount: 1 };
    let item = await itemService.create(createItemDto);
    const createCartItemDto: CreateCartItemDto = {
      amount: 3,
      item: { uuid: item.uuid },
    };
    let cartItem = await cartItemService.create(createCartItemDto);

    await req.put(`/cart-items/${cartItem.uuid}/shopped`).send().expect(200);

    expect(item.amount).toEqual(createItemDto.amount);
    expect(cartItem).toEqual(expect.objectContaining({ isShopped: false }));

    [item, cartItem] = await Promise.all([
      itemService.getOne(item.uuid),
      cartItemService.getOne(cartItem.uuid),
    ]);

    expect(item.amount).toEqual(
      createItemDto.amount + createCartItemDto.amount,
    );
    expect(cartItem).toEqual(expect.objectContaining({ isShopped: true }));
  });
});
