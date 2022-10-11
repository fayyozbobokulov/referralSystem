import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Base } from '../../global/entities/base.entity';
import { Level } from '../../level/entities/level.entity';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Referral } from '../../referral/entities/referral.entity';

@Entity()
export class Store extends Base {
  @ApiProperty()
  @Column()
  name: string;

  @OneToMany(() => Level, (level) => level, { nullable: true })
  levels: Level[];

  @ManyToMany(() => User, (user) => user.stores, { nullable: true })
  users: User[];

  @OneToMany(() => Referral, (referral) => referral.store)
  referrals: Referral[];
}
