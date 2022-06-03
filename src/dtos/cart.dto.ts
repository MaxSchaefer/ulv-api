import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCartDto {
  @IsString()
  shoppingLocation: string;
}

export class UpdateCartDto {
  @IsOptional()
  @IsString()
  shoppingLocation?: string;

  @IsOptional()
  @IsBoolean()
  isDone?: boolean;
}
