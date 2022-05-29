import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UUID } from '../utils/uuid.type';
import { ApiHideProperty } from '@nestjs/swagger';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: UUID;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @ApiHideProperty()
  @DeleteDateColumn({ type: 'datetime', select: false })
  deletedAt: Date;
}
