import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createApp } from './utils';
import { CartService } from '../src/services/cart.service';
import { CreateCartDto, UpdateCartDto } from '../src/dtos/cart.dto';

describe('Cart', () => {
  let app: INestApplication;
  let req: request.SuperTest<request.Test>;
  let cartService: CartService;

  beforeEach(async () => {
    const a = await createApp();
    app = a.app;
    req = a.req;
    cartService = app.get(CartService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('Create cart', async () => {
    const dto: CreateCartDto = { shoppingLocation: 'Rewe' };
    const res = req.post('/carts').send(dto).expect(201);
    const { body } = await res;
    expect(body).toEqual(
      expect.objectContaining({ shoppingLocation: 'Rewe', isDone: false }),
    );
  });

  it('Read all carts', async () => {
    await Promise.all([
      cartService.create({ shoppingLocation: 'Rewe' }),
      cartService.create({ shoppingLocation: 'Aldi' }),
    ]);

    const res = req.get('/carts').expect(200);
    const { body } = await res;

    expect(body).toHaveLength(2);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ shoppingLocation: 'Rewe' }),
        expect.objectContaining({ shoppingLocation: 'Aldi' }),
      ]),
    );
  });

  it('Rename cart', async () => {
    const updateDto: UpdateCartDto = { shoppingLocation: 'Aldi' };
    const cart = await cartService.create({
      shoppingLocation: 'Rewe',
    });

    const res = req.patch(`/carts/${cart.uuid}`).send(updateDto).expect(200);
    const { body } = await res;

    expect(body).toEqual(expect.objectContaining({ shoppingLocation: 'Aldi' }));
  });

  it('Set cart to done', async () => {
    const updateDto: UpdateCartDto = { isDone: true };
    const cart = await cartService.create({
      shoppingLocation: 'Rewe',
    });

    const res = req.patch(`/carts/${cart.uuid}`).send(updateDto).expect(200);
    const { body } = await res;

    expect(body).toEqual(expect.objectContaining({ isDone: true }));
  });

  it('Delete cart', async () => {
    const cart = await cartService.create({
      shoppingLocation: 'Rewe',
    });

    return req.delete(`/carts/${cart.uuid}`).expect(200);
  });
});
