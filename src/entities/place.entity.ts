import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Place extends AbstractEntity {
  @Column()
  name: string;
}
