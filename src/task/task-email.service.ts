import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EMAIL, EMAIL_HOST, EMAIL_PWD, EMAIL_PORT } from '../env';


@Injectable()
export class EmailService {
 private transporter: nodemailer.Transporter;

 constructor() {
    this.transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: {
            user: EMAIL,
            pass: EMAIL_PWD,
        },
        });
 }

 async sendMail(dest: string, subject: string, body: string): Promise<void> {

    console.log(EMAIL, EMAIL_HOST, EMAIL_PORT, EMAIL_PWD)

    const mailOptions = {
      from: process.env.EMAIL,
      to: dest,
      subject: subject,
      text: body,
    };

    console.log(mailOptions);

    try {
        const transportResp = await this.transporter.sendMail(mailOptions);
        console.log('Email sent successfully',transportResp);
        return transportResp;
    } catch (err) {
        console.error(err);

        return null;
    }
 }
}