import { RolesRepository } from './infra/typeorm/repositories/RolesRepository';
import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';
import IUsersRepository from './repositories/IUsersRepository';

export const providers = [
    { provide: 'UsersRepository', useClass: UsersRepository },
    { provide: 'RolesRepository', useClass: RolesRepository },
];

export default providers;
