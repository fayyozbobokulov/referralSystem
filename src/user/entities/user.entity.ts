import { Column, Entity } from 'typeorm';
import { Base } from '../../global/entities/base.entity';
import { Referral } from '../../referral/entities/referral.entity';
import { Store } from '../../store/entities/store.entity';
import { Receipt } from '../../receipt/entities/receipt.entity';

@Entity('user')
export class User extends Base {
  @Column()
  name: string;
  @Column()
  cashback: number;
  @Column()
  phone_number: string;
  @Column()
  referrals: Referral[];
  @Column()
  stores: Store[];
  @Column()
  receipts: Receipt[];
}
