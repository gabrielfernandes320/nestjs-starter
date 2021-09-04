import { MailModule } from './../mail/MailModule';
import { JwtStrategy } from './strategies/JwtStrategy';
import { Module } from '@nestjs/common';
import { AuthController } from './infra/http/AuthController';
import LoginService from './services/LoginService';
import ForgotPasswordService from './services/ForgotPasswordService';
import { UsersModule } from '../users/UsersModule';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import ValidateUserService from './services/ValidateUserService';
import { LocalStrategy } from './strategies/LocalStrategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ChangePasswordService from './services/ChangePasswordService';

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
                    expiresIn: configService.get('JWT_EXPIRATION_TIME'),
                },
            }),
        }),
    ],
    providers: [
        ConfigService,
        LoginService,
        ValidateUserService,
        JwtStrategy,
        LocalStrategy,
        ForgotPasswordService,
        ChangePasswordService,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
