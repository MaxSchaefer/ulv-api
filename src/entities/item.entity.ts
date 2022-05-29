import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Item extends AbstractEntity {
  @Column()
  name: string;

  @Column({ default: 0 })
  amount: number;

  @Column({ type: 'datetime', nullable: true })
  expireAt: Date;
}
