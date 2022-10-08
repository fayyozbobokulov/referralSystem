import { Base } from '../../global/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('item')
export class Item extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
