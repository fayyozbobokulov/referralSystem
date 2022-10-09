import { Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Base } from '../../global/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Store } from '../../store/entities/store.entity';

@Entity('referral')
export class Referral extends Base {
  @ManyToOne(() => User, (user) => user.id)
  user: string;

  @OneToOne(() => User, (user) => user.id)
  parent: string;

  @OneToOne(() => User, (user) => user.id)
  child: string;

  @OneToMany(() => Store, (store) => store.id)
  store: string;
}
