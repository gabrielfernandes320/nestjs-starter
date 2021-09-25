import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor(
        private configService: ConfigService,
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.Authentication,
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    public async validate(payload: any) {
        return this.usersRepository.findById(payload.id, {
            relations: ['roles', 'roles.permissions'],
        });
    }
}
