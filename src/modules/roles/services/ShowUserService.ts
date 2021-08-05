import { Inject, Injectable } from '@nestjs/common';
import { User } from '../infra/typeorm/entities/UserEntity';
import IUsersRepository from '../repositories/IUsersRepository';

@Injectable()
export default class ShowUserService {
    public constructor(
		@Inject('UsersRepository')
		private usersRepository: IUsersRepository,
    ) { }

    public async execute(userId): Promise<User> {
        const user = await this.usersRepository.findById(userId);

        return user;
    }
}
