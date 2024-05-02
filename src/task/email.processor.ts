import {Process, Processor} from '@nestjs/bull';
import {Job} from 'bull';
import {EmailService} from './task-email.service';

@Processor('task-queue')
export class TaskProcessor {
    constructor(private readonly emailService: EmailService) {}

    @Process('sendEmail')
    async sendEmail(job: Job) {
        const {to, subject, body} = job.data;
        await this.emailService.sendMail(to, subject, body);
    }
}