import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Base } from '../../global/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Store } from '../../store/entities/store.entity';
import { Item } from './item.entity';

@Entity()
export class Receipt extends Base {
  @ManyToOne(() => User, (user) => user.receipts)
  user: User;

  @OneToOne(() => Store, (store) => store.id)
  store: string;

  @Column()
  amount: number;

  @OneToMany(() => Item, (item) => item.id)
  items: Item[];
}
