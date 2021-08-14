require('dotenv').config({ path: `.env` });
import { JwtStrategy } from './strategies/JwtStrategy';
import { Module } from '@nestjs/common';
import { AuthController } from './infra/http/AuthController';
import LoginService from './services/LoginService';
import { UsersModule } from '../users/UsersModule';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import SendPasswordResetRequestService from './services/SendPasswordResetRequestService';
import ResetPasswordService from './services/ResetPasswordService';
import ValidateUserService from './services/ValidateUserService';
import { LocalStrategy } from './strategies/LocalStrategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
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
        LoginService,
        ValidateUserService,
        SendPasswordResetRequestService,
        ResetPasswordService,
        LocalStrategy,
        JwtStrategy,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
