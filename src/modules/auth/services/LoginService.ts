import { Inject, Injectable } from '@nestjs/common';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import LoginDTO from '../dtos/LoginDTO';
import { JwtService } from '@nestjs/jwt';
import ValidateUserService from './ValidateUserService';
import AuthConfigService from '../../config/services/AuthConfigService';
import JwtConfigService from '../../config/services/JwtConfigService';
import GenerateCookieService from './GenerateCookieService';
import { CookieType } from '../enums/CookieTypeEnum';

@Injectable()
export default class LoginService {
    public constructor(
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
        private validateUserService: ValidateUserService,
        private jwtService: JwtService,
        private authConfigService: AuthConfigService,
        private jwtConfigService: JwtConfigService,
        private generateCookieService: GenerateCookieService,
    ) {}

    public async execute(loginDto: LoginDTO): Promise<any> {
        const user = await this.usersRepository.findByEmail(loginDto.login);

        if (user) {
            if (await this.validateUserService.execute(loginDto)) {
                const authCookie = await this.generateCookieService.execute(
                    CookieType.Authentication,
                    user.id,
                );
                const refreshTokenCookie =
                    await this.generateCookieService.execute(
                        CookieType.Refresh,
                        user.id,
                    );

                return {
                    user: user,
                    cookie: authCookie,
                    cookieRefreshToken: refreshTokenCookie,
                };
            }
        }

        throw new Error();
    }
}
