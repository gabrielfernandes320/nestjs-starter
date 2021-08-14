import { Module } from '@nestjs/common';
import { RolesModule } from './modules/roles/RolesModule';
import { UsersModule } from './modules/users/UsersModule';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './modules/database/DatabaseModule';
import { AuthModule } from './modules/auth/AuthModule';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                POSTGRES_DB: Joi.string().required(),
                PORT: Joi.number(),
            }),
        }),
        DatabaseModule,
        UsersModule,
        RolesModule,
    ],

    controllers: [],
    providers: [],
})
export class AppModule {}
