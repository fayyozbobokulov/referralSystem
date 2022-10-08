import { Column, Entity, ManyToMany, OneToMany, Unique } from 'typeorm';
import { Base } from '../../global/entities/base.entity';
import { Referral } from '../../referral/entities/referral.entity';
import { Store } from '../../store/entities/store.entity';
import { Receipt } from '../../receipt/entities/receipt.entity';

@Entity('user')
@Unique(['phone_number'])
export class User extends Base {
  @Column()
  name: string;

  @Column()
  cashback: number;

  @Column()
  phone_number: string;

  @OneToMany(() => Referral, (referral) => referral.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  referrals: Referral[];

  @ManyToMany(() => Store, (store) => store.users, {
    nullable: true,
  })
  stores: Store[];

  @OneToMany(() => Receipt, (receipt) => receipt.user, {
    nullable: true,
  })
  receipts: Receipt[];
}
