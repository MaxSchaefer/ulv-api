import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateItemDto, UpdateItemDto } from '../src/dtos/item.dto';
import { ItemService } from '../src/services/item.service';
import { createApp } from './utils';

describe('Item', () => {
  let app: INestApplication;
  let req: request.SuperTest<request.Test>;
  let itemService: ItemService;

  beforeEach(async () => {
    const a = await createApp();
    app = a.app;
    req = a.req;
    itemService = app.get(ItemService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('Create item', () => {
    const dto: CreateItemDto = { name: 'Apfel' };
    return req.post('/items').send(dto).expect(201);
  });

  it('Create item with expireAt', async () => {
    const res = req
      .post('/items')
      .send({ name: 'Apfel', expireAt: '2022-01-01' })
      .expect(201);
    const { body } = await res;
    expect(body).toEqual(
      expect.objectContaining({
        name: 'Apfel',
        expireAt: '2022-01-01T00:00:00.000Z',
      }),
    );
  });

  it('Create item with nutrients and default values', async () => {
    const dto: CreateItemDto = { name: 'Apfel', nutrients: { calories: 10 } };
    const res = req.post('/items').send(dto).expect(201);
    const { body } = await res;
    expect(body).toEqual(
      expect.objectContaining({
        name: 'Apfel',
      }),
    );
    expect(body.nutrients).toEqual(
      expect.objectContaining({ calories: 10, protein: 0 }),
    );
  });

  it('Read all items', async () => {
    await Promise.all([
      itemService.create({ name: 'Pizza' }),
      itemService.create({ name: 'Apfel' }),
    ]);

    const res = req.get('/items').expect(200);
    const { body } = await res;

    expect(body).toHaveLength(2);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Pizza' }),
        expect.objectContaining({ name: 'Apfel' }),
      ]),
    );
  });

  it('Update item', async () => {
    const updateDto: UpdateItemDto = { name: 'Pizza' };
    const item = await itemService.create({
      name: 'Piza',
    });

    const res = req.patch(`/items/${item.uuid}`).send(updateDto).expect(200);
    const { body } = await res;

    expect(body).toEqual(
      expect.objectContaining({ uuid: item.uuid, name: updateDto.name }),
    );
  });

  it('Create and read item with group-key', async () => {
    const groupKeyHeader = { 'X-Group-Key': '123-abc-456' };

    let res;
    let body;

    // Create item with group-key
    const dto: CreateItemDto = { name: 'Apfel' };
    res = req.post('/items').send(dto).set(groupKeyHeader).expect(201);
    ({ body } = await res);

    expect(body).toEqual(expect.objectContaining({ name: dto.name }));

    // Create item without group-key
    await req.post('/items').send({ name: 'Banane' }).expect(201);

    // Read item
    res = req.get('/items').set(groupKeyHeader).expect(200);
    ({ body } = await res);

    expect(body).toHaveLength(1);
    expect(body).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Apfel' })]),
    );
  });
});
