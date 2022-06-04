import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { Connection } from 'typeorm';

export const createApp = async (): Promise<{
  app: INestApplication;
  req: request.SuperTest<request.Test>;
}> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = module.createNestApplication();
  await app.get(Connection).synchronize(true);
  await app.init();
  return { app: app, req: request(app.getHttpServer()) };
};
