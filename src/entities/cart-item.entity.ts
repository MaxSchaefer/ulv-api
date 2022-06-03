import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Item } from './item.entity';

@Entity()
export class CartItem extends AbstractEntity {
  @Column({ nullable: true })
  shoppingLocation?: string;

  @Column({ default: false })
  isShopped: boolean;

  @Column()
  amount: number;

  @ManyToOne(() => Item)
  item: Item;
}
