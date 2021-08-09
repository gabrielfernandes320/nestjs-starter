import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../database.config';
import { RolesModule } from './modules/roles/RolesModule';
import { UsersModule } from './modules/users/UsersModule';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'admin',
            database: 'innova',
            entities: ['dist/**/*Entity.js'],
            synchronize: false,
            cli: {
                migrationsDir: 'src/migrations',
            },
        }),
        UsersModule,
        RolesModule,
    ],

    controllers: [],
    providers: [],
})
export class AppModule {}
