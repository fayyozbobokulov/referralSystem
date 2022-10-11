import { Base } from '../../global/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Store } from '../../store/entities/store.entity';

@Entity('level')
export class Level extends Base {
  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  percentage: number;

  @ManyToOne(() => Store, (store) => store.levels)
  store: Store;

  @ApiProperty()
  @Column()
  order: number;
}
