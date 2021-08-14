//import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { JWT_EXPIRE_PASSWORD_RESET } from 'src/config/jwt';
//import { URL_ACCOUNTS } from 'src/config/url';
import PasswordResetRequestDTO from 'src/modules/auth/dtos/PasswordResetRequestDTO';
//import SendMailService from 'src/modules/mail/services/SendMailService';
import { User } from 'src/modules/users/infra/typeorm/entities/UserEntity';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';

@Injectable()
export default class SendPasswordResetRequestService {
    public constructor(
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
        //@Inject('SendMailService')
        //private sendMailService: SendMailService,
        @Inject('JwtService')
        private jwtService: JwtService,
    ) {}

    public async execute(loginDto: PasswordResetRequestDTO): Promise<User> {
        const user = await this.usersRepository.findByEmail(loginDto.email);
        // const token = this.jwtService.sign(
        //     { email: user.email },
        //     { expiresIn: JWT_EXPIRE_PASSWORD_RESET },
        // );

        // const emailOptions: ISendMailOptions = {
        //     to: user.email,
        //     subject: 'Nexen - Recuperar senha',
        //     template: 'recuperar-senha',
        //     context: {
        //         Customer: {
        //             Name: user.name,
        //         },
        //         Urls: {
        //             Domain: URL_ACCOUNTS,
        //             ResetPassword: `${URL_ACCOUNTS}/password/reset/${token}`,
        //         },
        //     },
        // };

        // await this.sendMailService.execute(emailOptions);

        return user;
    }
}
