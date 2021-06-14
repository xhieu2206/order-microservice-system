import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import config from '../ormconfig';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    OrderModule,
    TypeOrmModule.forRoot(config),
    TaskModule,
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
