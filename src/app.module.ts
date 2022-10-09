import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalModule } from './global/global.module';
import { ReferralModule } from './referral/referral.module';
import { StoreModule } from './store/store.module';
import { LevelModule } from './level/level.module';
import { ReceiptModule } from './receipt/receipt.module';
import { AuthModule } from './auth/auth.module';
import { Level } from './level/entities/level.entity';
import { User } from './user/entities/user.entity';
import { Receipt } from './receipt/entities/receipt.entity';
import { Referral } from './referral/entities/referral.entity';
import { Store } from './store/entities/store.entity';
import { Item } from './receipt/entities/item.entity';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [User, Level, Receipt, Referral, Store, Item],
        synchronize: true,
        migrations: ['./migrations/*{.ts,.js}'],
      }),
    }),
    UserModule,
    GlobalModule,
    ReferralModule,
    StoreModule,
    LevelModule,
    ReceiptModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
