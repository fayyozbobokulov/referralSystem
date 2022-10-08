import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalModule } from './global/global.module';
import { ReferralModule } from './referral/referral.module';
import { StoreModule } from './store/store.module';
import { LevelModule } from './level/level.module';
import { ReceiptModule } from './receipt/receipt.module';

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
        entities: [],
        synchronize: false,
        migrations: ['./migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: './migrations',
        },
      }),
    }),
    UserModule,
    GlobalModule,
    ReferralModule,
    StoreModule,
    LevelModule,
    ReceiptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
