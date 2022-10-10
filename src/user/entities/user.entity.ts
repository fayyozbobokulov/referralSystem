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
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
@Unique(['phone_number'])
export class User extends Base {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ default: 0, type: 'float8' })
  cashback: number;

  @ApiProperty()
  @Column()
  phone_number: string;

  @ApiProperty()
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

  @BeforeInsert()
  async hasPassword() {
    this.password = await hash(this.password, 10);
  }
}
