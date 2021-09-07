import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class JwtConfigService {
    public appUrl: string;

    public constructor(private configService: ConfigService) {
        this.appUrl = this.configService.get('APP_URL');
    }
}
