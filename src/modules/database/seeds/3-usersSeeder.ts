import hashPassword from 'src/shared/utils/hashPassword';
import { Connection, Repository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Role } from '../../roles/infra/typeorm/entities/RoleEntity';
import { User } from '../../users/infra/typeorm/entities/UserEntity';

export default class Users implements Seeder {
    public constructor(
        private connection: Connection,
        private usersRepository: Repository<User>,
        private rolesRepository: Repository<Role>,
    ) {}

    public async run(factory: Factory, connection: Connection): Promise<any> {
        this.connection = connection;
        this.usersRepository = this.connection.getRepository(User);
        this.rolesRepository = this.connection.getRepository(Role);

        const userToInsert = await this.getUser();

        await this.usersRepository.delete({ email: userToInsert.email });

        await this.usersRepository.save(userToInsert);
    }

    private async getUser(): Promise<Partial<User>> {
        return {
            name: 'administrator',
            email: 'admin@gmail.com',
            password: await hashPassword('12345678'),
            enabled: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            roles: await this.rolesRepository.find(),
        };
    }
}
