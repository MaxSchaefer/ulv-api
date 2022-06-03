import { ApiTags } from '@nestjs/swagger';
import {
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

@ApiTags('cart-items')
@Controller('cart-items')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  create(@Body() dto: CreateCartItemDto): Promise<CartItem> {
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
