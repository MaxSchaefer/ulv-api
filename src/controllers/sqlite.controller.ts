import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  PreconditionFailedException,
  Res,
  StreamableFile,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from '../utils/config';
import { createReadStream, existsSync } from 'fs';
import { parse } from 'path';
import { Response } from 'express';

@ApiTags('sqlite')
@Controller('sqlite')
export class SqliteController {
  constructor(private readonly configService: ConfigService<Config>) {}

  @Version(VERSION_NEUTRAL)
  @ApiOperation({ summary: 'Download the sqlite file' })
  @Get('download')
  download(@Res({ passthrough: true }) res: Response): StreamableFile {
    const databaseString = this.configService.get('DATABASE');
    const isDatabaseStringAFile = existsSync(databaseString);
    if (!isDatabaseStringAFile)
      throw new PreconditionFailedException('Database is not a file');
    const databasePath = parse(databaseString);
    res.set({
      'Content-Disposition': `attachment; filename="${databasePath.base}"`,
    });
    const file = createReadStream(databaseString);
    return new StreamableFile(file);
  }
}
