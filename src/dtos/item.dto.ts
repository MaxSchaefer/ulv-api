import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EntityWithUuidDto } from '../utils/entityWithUuid.dto';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsNumber()
  amount = 0;

  @IsOptional()
  @IsDate()
  expireAt?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => EntityWithUuidDto)
  place?: EntityWithUuidDto;
}

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsDate()
  expireAt?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => EntityWithUuidDto)
  place?: EntityWithUuidDto;
}
