import { Module } from '@nestjs/common';
import { ItemController } from './controllers/item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config, validate } from './utils/config';
import { ItemService } from './services/item.service';
import { Item } from './entities/item.entity';
import { PlaceService } from './services/place.service';
import { PlaceController } from './controllers/place.controller';
import { Place } from './entities/place.entity';
import { Nutrients } from './entities/nutrients.entity';
import { NutrientsService } from './services/nutrients.service';
import { CartItemController } from './controllers/cart-item.controller';
import { CartItemService } from './services/cart-item.service';
import { CartItem } from './entities/cart-item.entity';
import { SqliteController } from './controllers/sqlite.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService<Config>],
      useFactory: (configService: ConfigService<Config>) => ({
        type: 'sqlite',
        database: configService.get('DATABASE'),
        entities: [`${__dirname}/entities/*.entity.{js,ts}`],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Item, Place, Nutrients, CartItem])
  ],
  controllers: [ItemController, PlaceController, CartItemController, SqliteController],
  providers: [ItemService, PlaceService, NutrientsService, CartItemService],
})
export class AppModule {}
