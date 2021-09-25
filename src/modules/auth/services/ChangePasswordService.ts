import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import UserNotFoundException from '../../users/exceptions/UserNotFoundException';
import { User } from '../../users/infra/typeorm/entities/UserEntity';
import ChangePasswordDTO from '../dtos/ChangePasswordDTO';
import InvalidTokenException from '../exceptions/InvalidTokenException';
import ValidateUserService from './ValidateUserService';

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

        if (!user) {
            throw new UserNotFoundException(tokenPayload.id);
        }

        user.password = changePassword.password;

        return await this.usersRepository.update(
            user.id,
            plainToClass(User, user),
        );
    }
}
