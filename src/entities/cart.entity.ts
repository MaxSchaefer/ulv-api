import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Cart extends AbstractEntity {
  @Column()
  shoppingLocation: string;

  @Column({ default: false })
  isDone: boolean;
}
