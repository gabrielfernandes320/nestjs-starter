import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import { Repository, Like, ILike, IsNull, Brackets } from 'typeorm';
import { User } from '../entities/UserEntity';
import hashPassword from 'src/shared/utils/hashPassword';
import CreateUserDTO from 'src/modules/users/dtos/CreateUserDTO';
import UpdateUserDTO from 'src/modules/users/dtos/UpdateUserDTO';
import { plainToClass } from 'class-transformer';
import UserNotFoundException from 'src/modules/users/exceptions/UserNotFoundException';
import ListUserDTO from 'src/modules/users/dtos/ListUserDTO';

@Injectable()
export class UsersRepository implements IUsersRepository {
    public constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    public async create(user: CreateUserDTO): Promise<User> {
        const newUser = this.usersRepository.create(plainToClass(User, user));

        newUser.password = await hashPassword(newUser.password);

        console.log(newUser);

        return await this.usersRepository.save(newUser);
    }

    public async update(id: number, user: UpdateUserDTO): Promise<User> {
        const userToUpdate = plainToClass(User, user);

        userToUpdate.password = await hashPassword(userToUpdate.password);

        await this.usersRepository.update(id, userToUpdate);

        const updatedUser = await this.usersRepository.findOne(id);

        if (updatedUser) {
            return updatedUser;
        }

        throw new UserNotFoundException(id);
    }

    public async findAll({
        page,
        perPage,
        search,
        order,
    }: ListUserDTO): Promise<any> {
        const [result, total] = await this.usersRepository.findAndCount({
            where: { name: ILike(`%${search ?? ''}%`) },
            order: { id: order ?? 'DESC' },
            take: perPage,
            skip: perPage * (page - 1),
            relations: ['roles'],
        });

        return {
            data: result,
            total: total,
            pages: Math.round(total / perPage),
        };
    }

    public async findById(id: number): Promise<User> {
        const user = await this.usersRepository.findOne(id, {
            where: { deletedAt: null },
        });

        if (user) {
            return user;
        }

        throw new UserNotFoundException(id);
    }

    public async remove(id: number) {
        const deleted = await this.usersRepository.delete(id);

        if (!deleted.affected) {
            throw new UserNotFoundException(id);
        }
    }

    public async findByEmail(email: string): Promise<any> {
        return await this.usersRepository.findOne({
            where: { email },
        });
    }
}
