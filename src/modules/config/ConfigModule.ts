import { Module } from '@nestjs/common';
import {
    ConfigModule as NestConfigModule,
    ConfigService,
} from '@nestjs/config';
import DatabaseConfigService from './services/DatabaseConfigService';

@Module({
    imports: [NestConfigModule],
    controllers: [],
    providers: [ConfigService],
    exports: [DatabaseConfigService],
})
export class ConfigModule {}
