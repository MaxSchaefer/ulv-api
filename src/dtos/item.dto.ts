import {
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EntityWithUuidDto } from '../utils/entityWithUuid.dto';
import { CreateNutrientsDto, UpdateNutrientsDto } from './nutrients.dto';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsNumber()
  amount? = 0;

  @IsOptional()
  @IsISO8601()
  expireAt?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => EntityWithUuidDto)
  place?: EntityWithUuidDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateNutrientsDto)
  nutrients?: CreateNutrientsDto;
}

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsISO8601()
  expireAt?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => EntityWithUuidDto)
  place?: EntityWithUuidDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateNutrientsDto)
  nutrients?: UpdateNutrientsDto;
}
