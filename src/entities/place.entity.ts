import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Item } from './item.entity';

@Entity()
export class Place extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => Item, (item) => item.place)
  items: Item[];
}
