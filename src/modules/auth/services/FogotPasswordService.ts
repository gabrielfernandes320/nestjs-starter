import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import LoginDTO from '../dtos/LoginDTO';
import { JwtService } from '@nestjs/jwt';
import ValidateUserService from './ValidateUserService';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class FogotPasswordService {
    public constructor(
        private configService: ConfigService,
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
        private jwtService: JwtService,
    ) {}

    public async execute(email: string): Promise<any> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new BadRequestException('Invalid email');
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

        // await this.mailService.send({
        //     from: this.configService.get<string>('JS_CODE_MAIL'),
        //     to: user.email,
        //     subject: 'Verify User',
        //     html: `
        //         <h3>Hello ${user.firstName}!</h3>
        //         <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
        //     `,
        // });
    }
}
