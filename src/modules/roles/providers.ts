import { RolesRepository } from './infra/typeorm/repositories/RolesRepository';

export const providers = [
    { provide: 'RolesRepository', useClass: RolesRepository },
];

export default providers;
