import { IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;
}

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  name?: string;
}
