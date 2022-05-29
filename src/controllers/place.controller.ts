import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PlaceService } from '../services/place.service';
import { CreatePlaceDto, UpdatePlaceDto } from '../dtos/place.dto';
import { Place } from '../entities/place.entity';
import { UUID } from '../utils/uuid.type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('places')
@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  create(@Body() dto: CreatePlaceDto): Promise<Place> {
    return this.placeService.create(dto);
  }

  @Get()
  getAll(): Promise<Place[]> {
    return this.placeService.getAll();
  }

  @Get(':uuid')
  getOne(@Param('uuid') uuid: UUID): Promise<Place> {
    return this.placeService.getOne(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: UUID,
    @Body() dto: UpdatePlaceDto,
  ): Promise<Place> {
    return this.placeService.update(uuid, dto);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: UUID): Promise<void> {
    return this.placeService.delete(uuid);
  }
}
