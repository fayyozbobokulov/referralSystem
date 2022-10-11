import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../global/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Store } from '../../store/entities/store.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('referral')
export class Referral extends Base {
  @ManyToOne(() => User, (user) => user.referrals)
  user: User;

  @ApiProperty()
  @Column({ type: 'uuid', nullable: true })
  parent: string;

  @ApiProperty()
  @Column({ nullable: true })
  child_phone: string;

  @ManyToOne(() => Store, (store) => store.referrals)
  store: Store;

  @ApiProperty()
  @Column({ type: 'bool', default: false })
  accepted: boolean;
}
