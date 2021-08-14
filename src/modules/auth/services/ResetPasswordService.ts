import UpdateUserDTO from 'src/modules/users/dtos/UpdateUserDTO';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/infra/typeorm/entities/UserEntity';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import ResetPasswordDTO from '../dtos/ResetPasswordDTO';
import InvalidTokenException from '../errors/InvalidTokenException';
import { classToClass, plainToClass } from 'class-transformer';

@Injectable()
export default class ResetPasswordService {
    public constructor(
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @Inject('JwtService')
        private jwtService: JwtService,
    ) {}

    public async execute(resetPasswordDto: ResetPasswordDTO): Promise<User> {
        let decoded = null;

        try {
            decoded = this.jwtService.verify(resetPasswordDto.reset_token);
        } catch (err) {
            throw new InvalidTokenException();
        }

        const user = await this.usersRepository.findByEmail(decoded.email);

        user.password = resetPasswordDto.password;

        const userDto: UpdateUserDTO = plainToClass(UpdateUserDTO, user);

        return await this.usersRepository.update(user.id, userDto);
    }
}
