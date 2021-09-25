import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import AppConfigService from '../config/services/AppConfigService';
import AuthConfigService from '../config/services/AuthConfigService';
import JwtConfigService from '../config/services/JwtConfigService';
import { UsersModule } from '../users/UsersModule';
import { MailModule } from './../mail/MailModule';
import { AuthController } from './infra/http/AuthController';
import ChangePasswordService from './services/ChangePasswordService';
import ForgotPasswordService from './services/ForgotPasswordService';
import GenerateCookieService from './services/GenerateCookieService';
import LoginService from './services/LoginService';
import ValidateUserService from './services/ValidateUserService';
import { JwtRefreshTokenStrategy } from './strategies/JwtRefreshTokenStrategy';
import { JwtStrategy } from './strategies/JwtStrategy';
import { LocalStrategy } from './strategies/LocalStrategy';

@Module({
    imports: [
        MailModule,
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
                },
            }),
        }),
    ],
    providers: [
        AppConfigService,
        AuthConfigService,
        ConfigService,
        LoginService,
        ValidateUserService,
        JwtStrategy,
        LocalStrategy,
        JwtRefreshTokenStrategy,
        ForgotPasswordService,
        ChangePasswordService,
        JwtConfigService,
        GenerateCookieService,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
