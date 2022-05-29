import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Item extends AbstractEntity {
  @Column()
  name: string;
}
