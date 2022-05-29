import { plainToClass } from 'class-transformer';
import { IsEnum, IsPort, IsString, validateSync } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

export class Config {
  @IsEnum(Environment)
  NODE_ENV = Environment.Development;

  @IsPort()
  PORT = '1337';

  @IsString()
  DATABASE = 'ulv.sqlite';
}

export const validate = (config: Record<string, unknown>): Config => {
  const configAsClass = plainToClass(Config, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(configAsClass, { skipMissingProperties: false });
  if (errors.length > 0) throw new Error(errors.toString());

  return configAsClass;
};
