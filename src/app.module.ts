import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderPaymentModule } from './order-payment/order-payment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

@Module({
  imports: [
    OrderModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<SqliteConnectionOptions> => ({
        type: 'sqlite',
        database: configService.get<string>('DB_NAME'),
        entities: ['dist/src/**/*.entity.js'],
        synchronize: false,
        migrations: ['dist/src/db/migrations/*.js'],
        cli: {
          migrationsDir: 'src/db/migrations',
        },
      }),
    }),
    TaskModule,
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    CategoryModule,
    ProductModule,
    OrderPaymentModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
