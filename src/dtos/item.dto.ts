import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsNumber()
  amount = 0;

  @IsOptional()
  @IsDate()
  expireAt?: Date;
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
}
