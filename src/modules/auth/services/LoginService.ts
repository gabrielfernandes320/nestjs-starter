import { Injectable } from '@nestjs/common';
import { User } from '../../users/infra/typeorm/entities/UserEntity';
import ShowUserByEmailService from '../../users/services/ShowUserByEmailService';
import LoginDTO from '../dtos/LoginDTO';
import { CookieType } from '../enums/CookieTypeEnum';
import GenerateCookieService from './GenerateCookieService';
import ValidateUserService from './ValidateUserService';

@Injectable()
export default class LoginService {
    public constructor(
        private validateUserService: ValidateUserService,
        private showUserByEmailService: ShowUserByEmailService,
        private generateCookieService: GenerateCookieService,
    ) {}

    public async execute(
        loginDto: LoginDTO,
    ): Promise<{ user: User; cookie: string; cookieRefreshToken: string }> {
        const user = await this.showUserByEmailService.execute(loginDto.login);

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
