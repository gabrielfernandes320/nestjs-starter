import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { URL_PORTAL } from 'src/config/url';
import SendMailService from '../../services/SendMailService';

@Controller('mail')
export class MailController {
    public constructor(
        @Inject('SendMailService')
        private mailService: SendMailService,
    ) {}

    @ApiResponse({
        status: 200,
        description:
            'Tests mail-sending service, mails to gabrielfernandesfg@hotmail.com.',
    })
    @Get()
    public async index(@Query() requestData) {
        try {
            const emailOptions = {
                to: 'gabrielfernandesfg@hotmail.com', // list of receivers
                //from: 'noreply@nestjs.com', // sender address

                subject: 'Testing Nest MailerModule ✔', // Subject line
                //text: 'welcome', // plaintext body
                template: 'cadastro-aprovado', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context: {
                    // Data to be sent to template engine.
                    Customer: {
                        Name: 'Gabriel Fernandes',
                        Email: 'Teste@gmail.com',
                    },
                    Urls: {
                        FullBaseUrl: URL_PORTAL,
                    },
                },
            };
            const cities = await this.mailService.execute(emailOptions);

            return {
                data: cities,
            };
        } catch (error) {
            console.log(error);
        }
    }
}
