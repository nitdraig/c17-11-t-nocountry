import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMailOptions, createTransport } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  private gmail: {
    address: string;
    password: string;
  } = this.configService.get('mail');

  async send(email: string, title: string, body: string | Buffer) {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: this.gmail.address,
        pass: this.gmail.password,
      },
    });

    const mailOptions: SendMailOptions = {
      from: this.gmail.address,
      to: email,
      subject: title,
      html: body,
    };

    return transporter.sendMail(mailOptions);
  }
}
