import { Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Base } from '../../global/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Store } from '../../store/entities/store.entity';
import { Unique } from 'typeorm/browser';

@Entity()
@Unique(['user', 'child', 'store'])
export class Referral extends Base {
  @ManyToOne(() => User, (user) => user.referrals)
  user: User;

  @OneToOne(() => User)
  parent: User;

  @OneToOne(() => User)
  child: User;

  @OneToMany(() => Store, (store) => store.id)
  store: string;
}
