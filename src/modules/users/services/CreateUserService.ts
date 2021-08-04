import CreateUserDto from '../dtos/CreateUserDTO';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../infra/typeorm/entities/UserEntity';
import IUsersRepository from '../repositories/IUsersRepository';

@Injectable()
export default class CreateUserService {
    public constructor(
        @Inject('UsersRepository') private usersRepository: IUsersRepository,
    ) {}

    public async execute(userDto: CreateUserDto): Promise<User> {
        return await this.usersRepository.create(userDto);
    }
}
