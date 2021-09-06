import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import { Repository, ILike } from 'typeorm';
import { User } from '../entities/UserEntity';
import CreateUserDTO from 'src/modules/users/dtos/CreateUserDTO';
import UpdateUserDTO from 'src/modules/users/dtos/UpdateUserDTO';
import { plainToClass } from 'class-transformer';
import ListUserDTO from 'src/modules/users/dtos/ListUserDTO';
import UserNotFoundException from '../../../exceptions/UserNotFoundException';
import EmailAlreadyExistsException from '../../../exceptions/EmailAlreadyExistsException';

@Injectable()
export class UsersRepository implements IUsersRepository {
    public constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    public async create(user: CreateUserDTO): Promise<User> {
        const newUser = this.usersRepository.create(plainToClass(User, user));

        try {
            return await this.usersRepository.save(newUser);
        } catch (error) {
            this.handleErrors(error, newUser);
        }
    }

    public async update(id: number, userDto: UpdateUserDTO): Promise<User> {
        const user = await this.usersRepository.findOne(id);

        if (!user) {
            throw new UserNotFoundException(id);
        }

        let userToUpdate = plainToClass(User, userDto);

        userToUpdate.id = id;

        if (userToUpdate.password === '') {
            userToUpdate.password = undefined;
        }

        const updatedUser = await this.usersRepository.save(userToUpdate);

        if (updatedUser) {
            return updatedUser;
        }
    }

    public async findAll(params: ListUserDTO): Promise<any> {
        const { page, perPage, search, order } = params;

        const [result, total] = await this.usersRepository.findAndCount({
            where: { name: ILike(`%${search ?? ''}%`) },
            order: { id: order },
            take: perPage,
            skip: perPage * (page - 1),
            relations: ['roles'],
        });

        return {
            value: result,
            total: total,
            pages: Math.round(total / perPage),
        };
    }

    public async findById(id: number): Promise<User> {
        const user = await this.usersRepository.findOne(id, {
            relations: ['roles', 'roles.permissions'],
        });

        if (user) {
            return user;
        }

        throw new UserNotFoundException(id);
    }

    public async remove(id: number) {
        const deleted = await this.usersRepository.softDelete(id);

        if (!deleted.affected) {
            throw new UserNotFoundException(id);
        }
    }

    public async findByEmail(email: string): Promise<any> {
        return await this.usersRepository.findOne({
            where: { email },
            relations: ['roles', 'roles.permissions'],
        });
    }

    private handleErrors(error: any, user: User) {
        switch (error.code) {
            case '23505':
                throw new EmailAlreadyExistsException(user.email);

            default:
                throw HttpException;
        }
    }
}
