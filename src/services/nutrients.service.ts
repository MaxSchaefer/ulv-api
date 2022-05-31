import { Injectable } from '@nestjs/common';
import { AbstractService } from './abstract.service';
import { Nutrients } from '../entities/nutrients.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NutrientsService extends AbstractService<Nutrients> {
  constructor(
    @InjectRepository(Nutrients)
    protected readonly repository: Repository<Nutrients>,
  ) {
    super('nutrients');
  }
}
