import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../global/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Store } from '../../store/entities/store.entity';

@Entity('referral')
export class Referral extends Base {
  @ManyToOne(() => User, (user) => user.referrals)
  user: User;

  // @OneToOne(() => User, (user) => user.id)
  @Column({ type: 'uuid', nullable: true })
  parent: string;

  @Column({ nullable: true })
  child_phone: string;

  @ManyToOne(() => Store, (store) => store.referrals)
  store: Store;

  @Column({ type: 'bool', default: false })
  accepted: boolean;
}
