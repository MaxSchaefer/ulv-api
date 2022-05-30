import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EntityWithUuidDto } from '../utils/entityWithUuid.dto';

export class CreatePlaceDto {
  @IsString()
  name: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EntityWithUuidDto)
  items?: EntityWithUuidDto[];
}

export class UpdatePlaceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EntityWithUuidDto)
  items?: EntityWithUuidDto[];
}
