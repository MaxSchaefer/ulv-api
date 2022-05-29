import { IsOptional, IsString } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  name: string;
}

export class UpdatePlaceDto {
  @IsOptional()
  @IsString()
  name?: string;
}
