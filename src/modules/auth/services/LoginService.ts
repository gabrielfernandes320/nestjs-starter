import { Inject, Injectable } from '@nestjs/common';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import LoginDTO from '../dtos/LoginDTO';
import { JwtService } from '@nestjs/jwt';
import ValidateUserService from './ValidateUserService';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class LoginService {
    public constructor(
        private configService: ConfigService,
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
        private validateUserService: ValidateUserService,
        private jwtService: JwtService,
    ) {}

    public async execute(loginDto: LoginDTO): Promise<any> {
        const user = await this.usersRepository.findByEmail(loginDto.login);

        if (user) {
            if (await this.validateUserService.execute(loginDto)) {
                const userData = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    roles: [],
                };
                const token = this.jwtService.sign(userData);

                return {
                    token,
                    user: userData,
                    cookie: `Authentication=${token};  Domain=${this.configService.get(
                        'AUTH_COOKIE_DOMAIN',
                    )}; HttpOnly; Path=/; Max-Age=${this.configService.get(
                        'AUTH_COOKIE_EXPIRATION',
                    )}`,
                };
            }
        }

        throw new Error();
    }
}
