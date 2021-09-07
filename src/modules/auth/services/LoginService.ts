import { Inject, Injectable } from '@nestjs/common';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import LoginDTO from '../dtos/LoginDTO';
import { JwtService } from '@nestjs/jwt';
import ValidateUserService from './ValidateUserService';
import AuthConfigService from '../../config/services/AuthConfigService';
import JwtConfigService from '../../config/services/JwtConfigService';

@Injectable()
export default class LoginService {
    public constructor(
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
        private validateUserService: ValidateUserService,
        private jwtService: JwtService,
        private authConfigService: AuthConfigService,
        private jwtConfigService: JwtConfigService,
    ) {}

    public async execute(loginDto: LoginDTO): Promise<any> {
        const user = await this.usersRepository.findByEmail(loginDto.login);

        if (user) {
            if (await this.validateUserService.execute(loginDto)) {
                const userData = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    roles: user.roles,
                };
                const token = this.jwtService.sign(userData);
                const refreshToken = this.generateRefreshToken(userData);

                return {
                    user: user,
                    cookie: this.generateCookie(token),
                    cookieRefreshToken:
                        this.generateRefreshTokenCookie(refreshToken),
                };
            }
        }

        throw new Error();
    }

    private generateCookie(token: string) {
        return `Authentication=${token}; Domain=${this.authConfigService.cookieDomain}; HttpOnly; Path=/; Max-Age=${this.jwtConfigService.jwtExpirationTime}`;
    }

    private generateRefreshTokenCookie(token: string) {
        return `Refresh=${token}; Domain=${this.authConfigService.cookieDomain}; HttpOnly; Path=/; Max-Age=${this.jwtConfigService.jwtRefreshTokenExpirationTime}`;
    }

    private generateRefreshToken(payload: object) {
        const token = this.jwtService.sign(payload, {
            secret: this.jwtConfigService.jwtRefreshTokenSecret,
            expiresIn: `${this.jwtConfigService.jwtRefreshTokenExpirationTime}s`,
        });

        return token;
    }
}
