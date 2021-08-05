import { Inject, Injectable } from '@nestjs/common';
import { User } from '../infra/typeorm/entities/UserEntity';
import IUsersRepository from '../repositories/IUsersRepository';

@Injectable()
export default class ValidateUserEmailService {
    public constructor(
		@Inject('UsersRepository')
		private usersRepository: IUsersRepository,
    ) { }

    public async execute(email: string): Promise<User> {
        const user = await this.usersRepository.findByEmail(email);

        return user;
    }
}
