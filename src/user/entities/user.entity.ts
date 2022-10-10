import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  Unique,
} from 'typeorm';
import { Base } from '../../global/entities/base.entity';
import { Referral } from '../../referral/entities/referral.entity';
import { Store } from '../../store/entities/store.entity';
import { Receipt } from '../../receipt/entities/receipt.entity';
import { hash } from 'bcrypt';

@Entity('user')
@Unique(['phone_number'])
export class User extends Base {
  @Column()
  name: string;

  @Column({ default: 0, type: 'float8' })
  cashback: number;

  @Column()
  phone_number: string;

  @Column({ select: false })
  password: string;

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
  //
  // @OneToOne(() => Referral, (referral) => referral.child)
  // child: Referral;

  @BeforeInsert()
  async hasPassword() {
    this.password = await hash(this.password, 10);
  }
}
