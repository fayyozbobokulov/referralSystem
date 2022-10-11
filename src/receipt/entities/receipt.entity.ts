import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../global/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Receipt extends Base {
  @ManyToOne(() => User, (user) => user.receipts, {
    nullable: true,
  })
  user: User;

  @ApiProperty()
  @Column()
  store: string;

  @ApiProperty()
  @Column({ type: 'float8' })
  amount: number;
}
