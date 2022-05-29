import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UUID } from '../utils/uuid.type';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: UUID;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', select: false })
  deletedAt: Date;
}
