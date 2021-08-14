import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class DatabaseConfigService {
    public config: any;

    public constructor(private configService: ConfigService) {
        this.config = {
            type: 'postgres',
            host: this.configService.get('POSTGRES_HOST'),
            port: this.configService.get('POSTGRES_PORT'),
            username: this.configService.get('POSTGRES_USER'),
            password: this.configService.get('POSTGRES_PASSWORD'),
            database: this.configService.get('POSTGRES_DB'),
            entities: ['dist/**/*Entity.js'],
            synchronize: false,
            cli: {
                migrationsDir: 'src/migrations',
            },
        };
    }
}
