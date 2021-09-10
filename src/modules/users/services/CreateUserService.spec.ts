import CreateUserService from './CreateUserService';
import { Test, TestingModule } from '@nestjs/testing';
import {
    CreateUserDtoMock,
    mockUsersRepository,
} from '../mocks/UserMockFactory';
import { plainToClass } from 'class-transformer';
import { User } from '../infra/typeorm/entities/UserEntity';

describe('CreateUserService', () => {
    let service: CreateUserService;
    const mockUserDto = CreateUserDtoMock.build();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUserService,
                {
                    provide: 'UsersRepository',
                    useValue: mockUsersRepository,
                },
            ],
        }).compile();

        service = module.get<CreateUserService>(CreateUserService);
    });

    describe('createUserService', () => {
        it('should create a user in database and return the user', async () => {
            expect(await service.execute(mockUserDto)).toEqual(
                plainToClass(User, {
                    id: 1,
                    ...mockUserDto,
                }),
            );
        });
    });
});
