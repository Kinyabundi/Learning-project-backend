import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { BullModule } from '@nestjs/bull';
import { EmailService } from './task-email.service';
import { TaskProcessor } from './email.processor';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from 'src/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),
    BullModule.registerQueue({
      name: 'task-queue',
    }), UserModule,
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    EmailService,
    TaskProcessor,
  ],
  exports: [TaskService],
})
export class TaskModule {}
