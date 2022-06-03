import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EntityWithUuidDto } from '../utils/entityWithUuid.dto';

export class CreateCartItemDto {
  @IsOptional()
  @IsString()
  shoppingLocation?: string;

  @IsNumber()
  amount: number;

  @ValidateNested()
  @Type(() => EntityWithUuidDto)
  item: EntityWithUuidDto;
}

export class UpdateCartItemDto {
  @IsOptional()
  @IsString()
  shoppingLocation?: string;

  @IsOptional()
  @IsBoolean()
  isShopped?: boolean;

  @IsNumber()
  amount?: number;
}
