import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import typeorm from "./config/typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { BullModule } from '@nestjs/bull';
import { TaskModule } from './task/task.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get("typeorm"),
    }),
    AuthModule,
    UserModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
