import CreateUserDto from '../dtos/CreateUserDTO';
import UpdateUserDTO from '../dtos/UpdateUserDTO';
import { User } from '../infra/typeorm/entities/UserEntity';

export default interface IUsersRepository {
    findAll(params: any): Promise<User[]>;

    findById(id: string): Promise<User>;

    remove(id: number): Promise<void>;

    create(user: CreateUserDto): Promise<User>;

    update(user: UpdateUserDTO): Promise<User>;

    findByEmail(email: string): Promise<User>;
}
