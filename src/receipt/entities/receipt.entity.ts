import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Base } from '../../global/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Store } from '../../store/entities/store.entity';

@Entity()
export class Receipt extends Base {
  @ManyToOne(() => User, (user) => user.receipts)
  user: User;

  @OneToOne(() => Store, (store) => store.id)
  store: string;

  @Column({ type: 'float8' })
  amount: number;
}
