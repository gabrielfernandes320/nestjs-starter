import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class SendMailService {
    public constructor(private readonly mailerService: MailerService) {}

    public async execute(sendEmailOptions: ISendMailOptions): Promise<void> {
        await this.mailerService.sendMail(sendEmailOptions);
    }
}
