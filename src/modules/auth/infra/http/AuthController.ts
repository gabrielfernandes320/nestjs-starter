import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import LoginDTO from '../../dtos/LoginDTO';
import LoginService from '../../services/LoginService';
import { Response, response, Request } from 'express';
import { LocalAuthGuard } from '../../guards/LocalAuthGuard';
import InvalidTokenException from '../../errors/InvalidTokenException';
import JwtAuthenticationGuard from '../../guards/JwtAuthenticationGuard';
import { ApiTags, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    public constructor(private loginService: LoginService) {}

    @ApiResponse({
        status: 200,
        description: 'Provides user entity, jwt token and cookie.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    public async login(
        @Body() loginDto: LoginDTO,
        @Res() resp: Response,
        @Req() req: Request,
    ) {
        const { user, cookie, token } = await this.loginService.execute(
            loginDto,
        );

        resp.setHeader('Set-Cookie', cookie);

        return resp.send(user);
    }

    @ApiResponse({
        status: 200,
        description:
            'Provides single user entity from database, based on logged user.',
    })
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('user')
    public async getAuthenticatedUser(@Req() request: Request) {
        return request.user;
    }

    @ApiResponse({
        status: 200,
        description: 'Clears jwt cookie on browser',
    })
    @ApiResponse({
        status: 404,
        description: 'Not found',
    })
    @Post('logout')
    public async logout(@Res() resp: Response) {
        try {
            resp.clearCookie('Authentication');

            return resp.send();
        } catch (error) {
            throw new HttpException(
                'Erro ao realizar logout',
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
