import { Injectable } from '@nestjs/common';
import { AbstractService } from './abstract.service';
import { Place } from '../entities/place.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlaceService extends AbstractService<Place> {
  constructor(
    @InjectRepository(Place) protected readonly repository: Repository<Place>,
  ) {
    super('Place');
  }
}
