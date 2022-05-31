import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Place } from './place.entity';
import { Nutrients } from './nutrients.entity';

@Entity()
export class Item extends AbstractEntity {
  @Column()
  name: string;

  @Column({ default: 0 })
  amount: number;

  @Column({ type: 'datetime', nullable: true })
  expireAt: Date;

  @ManyToOne(() => Place, (place) => place.items)
  place: Place;

  @OneToOne(() => Nutrients, (nutrients) => nutrients.item, { cascade: true })
  nutrients: Nutrients;
}
