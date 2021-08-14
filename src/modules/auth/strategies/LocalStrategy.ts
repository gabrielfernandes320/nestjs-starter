import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ValidateUserService from '../services/ValidateUserService';
import ILoginDto from '../dtos/LoginDTO';
import { User } from 'src/modules/users/infra/typeorm/entities/UserEntity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    public constructor(private validateUserService: ValidateUserService) {
        super({ usernameField: 'login' });
    }

    public async checkPermissions(user: User): Promise<void> {
        if (user.roles?.some((x) => x.reference === 'INTEGRATOR')) {
            const seller = await this.showSellerByUserIdService.execute(
                user.id,
            );

            if (!seller || !seller.id) {
                throw new HttpException(
                    'Seu usuário é do tipo integrador mas não possui código de integrador cadastrado',
                    HttpStatus.FORBIDDEN,
                );
            }

            if (seller.status !== 'APPROVED') {
                throw new HttpException(
                    'Seu usuário ainda não foi aprovado, você receberá um email quando este processo for concluído',
                    HttpStatus.FORBIDDEN,
                );
            }
        }
    }

    public async validate(username: string, password: string): Promise<any> {
        const userLogin: ILoginDto = {
            login: username,
            password: password,
        };
        const user = await this.validateUserService.execute(userLogin);

        if (!user) {
            throw new HttpException(
                'Usuário ou senha inválida',
                HttpStatus.FORBIDDEN,
            );
        }

        await this.checkPermissions(user);

        return user;
    }
}
