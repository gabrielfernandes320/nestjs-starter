import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';
import IUsersRepository from './repositories/IUsersRepository';

export const providers = [
    { provide: 'UsersRepository', useClass: UsersRepository },
];

export default providers;
