import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import SendMailService from '../../mail/services/SendMailService';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import ForgotPasswordDTO from '../dtos/ForgotPasswordDTO';
import { User } from '../../users/infra/typeorm/entities/UserEntity';
import InvalidEmailException from '../exceptions/InvalidEmailException';

@Injectable()
export default class FogotPasswordService {
    public constructor(
        private configService: ConfigService,
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
        private jwtService: JwtService,
        private sendMailService: SendMailService,
    ) {}

    public async execute(forgotPasswordDto: ForgotPasswordDTO): Promise<User> {
        const user = await this.usersRepository.findByEmail(
            forgotPasswordDto.email,
        );

        if (!user) {
            throw new InvalidEmailException(forgotPasswordDto.email);
        }

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles,
        };
        const token = this.jwtService.sign(userData);

        const forgotLink = `${this.configService.get(
            'APP_URL',
        )}/auth/forgot-password?token=${token}`;

        await this.sendMailService.execute({
            from: this.configService.get<string>('MAIL_USER'),
            to: user.email,
            subject: 'Verify User',
            html: `
                <h3>Hello ${user.name}!</h3>
                <p>Please use this <a href="${forgotLink}">link</a> to confirm your account.</p>
            `,
        } as ISendMailOptions);

        console.log('aqui');

        return user;
    }
}
