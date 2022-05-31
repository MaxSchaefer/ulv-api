import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Item } from './item.entity';

@Entity()
export class Nutrients extends AbstractEntity {
  @Column({ type: 'float', default: 0.0 })
  calories: number;

  @Column({ type: 'float', default: 0.0 })
  protein: number;

  @Column({ type: 'float', default: 0.0 })
  carbohydrate: number;

  @Column({ type: 'float', default: 0.0 })
  fat: number;

  @Column({ type: 'float', default: 0.0 })
  vitaminA: number;

  @Column({ type: 'float', default: 0.0 })
  vitaminB: number;

  @Column({ type: 'float', default: 0.0 })
  vitaminC: number;

  @Column({ type: 'float', default: 0.0 })
  vitaminD: number;

  @Column({ type: 'float', default: 0.0 })
  vitaminE: number;

  @OneToOne(() => Item, (item) => item.nutrients)
  @JoinColumn()
  item: Item;
}
