import { IsNumber, IsOptional } from 'class-validator';

export class CreateNutrientsDto {
  @IsOptional()
  @IsNumber()
  calories?: number;

  @IsOptional()
  @IsNumber()
  protein?: number;

  @IsOptional()
  @IsNumber()
  carbohydrate?: number;

  @IsOptional()
  @IsNumber()
  fat?: number;

  @IsOptional()
  @IsNumber()
  vitaminA?: number;

  @IsOptional()
  @IsNumber()
  vitaminB?: number;

  @IsOptional()
  @IsNumber()
  vitaminC?: number;

  @IsOptional()
  @IsNumber()
  vitaminD?: number;

  @IsOptional()
  @IsNumber()
  vitaminE?: number;
}

export class UpdateNutrientsDto extends CreateNutrientsDto {}
