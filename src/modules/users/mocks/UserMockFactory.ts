import { User } from '../infra/typeorm/entities/UserEntity';
import * as Factory from 'factory.ts';
import { name, internet, datatype } from 'faker';
import { RoleMock } from '../../roles/mocks/RoleMockFactory';

export const UserMock = Factory.Sync.makeFactory<User>({
    id: Factory.each((i) => i),
    name: name.firstName(),
    email: internet.email(),
    enabled: datatype.boolean(),
    password: internet.password(),
    roles: RoleMock.buildList(2),
    createdAt: new Date(),
    deletedAt: null,
    updatedAt: new Date(),
    setCreated: () => {},
    setUpdatedAt: () => Promise.resolve(),
});
