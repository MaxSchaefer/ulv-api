import { ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UUID } from '../utils/uuid.type';
import { CartItemService } from '../services/cart-item.service';
import { CartItem } from '../entities/cart-item.entity';
import { CreateCartItemDto, UpdateCartItemDto } from '../dtos/cart-item.dto';
import { ItemService } from '../services/item.service';

@ApiTags('cart-items')
@Controller('cart-items')
export class CartItemController {
  constructor(
    private readonly cartItemService: CartItemService,
    private readonly itemService: ItemService,
  ) {}

  @Post()
  async create(@Body() dto: CreateCartItemDto): Promise<CartItem> {
    let itemUuid: UUID;

    if (!!dto.item) {
      itemUuid = dto.item.uuid;
    } else if (!!dto.newItem) {
      const item = await this.itemService.create(dto.newItem);
      itemUuid = item.uuid;
    } else {
      throw new BadRequestException('item or newItem is required');
    }

    dto.item = { uuid: itemUuid };
    if (dto.newItem) delete dto.newItem;

    return this.cartItemService.create(dto);
  }

  @Get()
  getAll(): Promise<CartItem[]> {
    return this.cartItemService.getAll();
  }

  @Get(':uuid')
  getOne(@Param('uuid') uuid: UUID): Promise<CartItem> {
    return this.cartItemService.getOne(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: UUID,
    @Body() dto: UpdateCartItemDto,
  ): Promise<CartItem> {
    return this.cartItemService.update(uuid, dto);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: UUID): Promise<void> {
    return this.cartItemService.delete(uuid);
  }
}
