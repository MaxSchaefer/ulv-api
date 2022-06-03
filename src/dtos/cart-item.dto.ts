import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EntityWithUuidDto } from '../utils/entityWithUuid.dto';
import { CreateItemDto } from './item.dto';

export class CreateCartItemDto {
  @IsOptional()
  @IsString()
  shoppingLocation?: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => EntityWithUuidDto)
  item?: EntityWithUuidDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateItemDto)
  newItem?: CreateItemDto;
}

export class UpdateCartItemDto {
  @IsOptional()
  @IsString()
  shoppingLocation?: string;

  @IsNumber()
  amount?: number;
}
