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
import { CartService } from '../services/cart.service';
import { Cart } from '../entities/cart.entity';
import { CreateCartDto, UpdateCartDto } from '../dtos/cart.dto';

@ApiTags('carts')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() dto: CreateCartDto): Promise<Cart> {
    return this.cartService.create(dto);
  }

  @Get()
  getAll(): Promise<Cart[]> {
    return this.cartService.getAll();
  }

  @Get(':uuid')
  getOne(@Param('uuid') uuid: UUID): Promise<Cart> {
    return this.cartService.getOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: UUID, @Body() dto: UpdateCartDto): Promise<Cart> {
    return this.cartService.update(uuid, dto);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: UUID): Promise<void> {
    return this.cartService.delete(uuid);
  }
}
