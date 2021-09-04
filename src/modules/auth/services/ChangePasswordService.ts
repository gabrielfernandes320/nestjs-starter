import { plainToClass } from 'class-transformer';
import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import LoginDTO from '../dtos/LoginDTO';
import { JwtService } from '@nestjs/jwt';
import ValidateUserService from './ValidateUserService';
import { ConfigService } from '@nestjs/config';
import ChangePasswordDTO from '../dtos/ChangePasswordDTO';
import InvalidTokenException from '../exceptions/InvalidTokenException';
import CreateUserDTO from '../../users/dtos/CreateUserDTO';
import UpdateUserDTO from '../../users/dtos/UpdateUserDTO';

@Injectable()
export default class LoginService {
    public constructor(
        private configService: ConfigService,
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
        private validateUserService: ValidateUserService,
        private jwtService: JwtService,
    ) {}

    public async execute(changePassword: ChangePasswordDTO): Promise<any> {
        const tokenPayload: any = this.jwtService.decode(changePassword.token);

        if (!tokenPayload) {
            throw new InvalidTokenException();
        }

        const user = await this.usersRepository.findByEmail(tokenPayload.email);

        user.password = changePassword.password;

        return await this.usersRepository.update(
            user.id,
            plainToClass(UpdateUserDTO, user),
        );
    }
}
