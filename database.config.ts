// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import {
//     DATABASE_NAME,
//     DATABASE_PASSWORD,
//     DATABASE_TYPE,
//     DATABASE_PORT,
//     DATABASE_USER,
//     DATABASE_HOST,
// } from './src/config/database';

// require('dotenv').config({ path: `.env` });

// const config: TypeOrmModuleOptions = {
//     type: <any>DATABASE_TYPE,
//     host: DATABASE_HOST,
//     port: <any>DATABASE_PORT,
//     username: DATABASE_USER,
//     password: DATABASE_PASSWORD,
//     database: DATABASE_NAME,
//     entities: ['dist/entity/**/*.js'],
//     synchronize: false,
//     migrations: ['src/migrations/**/*.ts'],
//     cli: {
//         migrationsDir: 'src/migrations',
//         entitiesDir: 'dist/entity',
//     },
// };

// export default config;
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_TYPE,
    DATABASE_PORT,
    DATABASE_USER,
    DATABASE_HOST,
} from './src/config/database';

const config: TypeOrmModuleOptions = {
    type: <any>DATABASE_TYPE,
    host: DATABASE_HOST,
    port: <any>DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    entities: ['dist/**/*Entity.js'],
    synchronize: false,
    cli: {
        migrationsDir: 'src/migrations',
    },
};

export default config;
