import { AbstractService } from './abstract.service';
import { Cart } from '../entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService extends AbstractService<Cart> {
  constructor(
    @InjectRepository(Cart) protected readonly repository: Repository<Cart>,
  ) {
    super('cart');
  }
}
