require('dotenv').config({ path: `.env` });

import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export default {
    ...{
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: ['dist/**/*Entity.js'],
        synchronize: false,
        cli: {
            migrationsDir: 'src/migrations',
        },
    },
    ...{
        migrations: ['src/migrations/**/*.ts'],
    },
};
