import {
  Column,
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

  @ApiHideProperty()
  @Column({ nullable: true, select: false })
  groupKey?: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @ApiHideProperty()
  @DeleteDateColumn({ type: 'datetime', select: false })
  deletedAt: Date;
}
