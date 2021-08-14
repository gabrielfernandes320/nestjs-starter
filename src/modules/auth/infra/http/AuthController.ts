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
import PasswordResetRequestDTO from '../../dtos/PasswordResetRequestDTO';
import SendPasswordResetRequestService from '../../services/SendPasswordResetRequestService';
import { Response, response, Request } from 'express';
import ResetPasswordService from '../../services/ResetPasswordService';
import ResetPasswordDTO from '../../dtos/ResetPasswordDTO';
import { LocalAuthGuard } from '../../guards/LocalAuthGuard';
import InvalidTokenException from '../../errors/InvalidTokenException';
import JwtAuthenticationGuard from '../../guards/JwtAuthenticationGuard';
import { ApiTags, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

class authenticatedData {
    @ApiProperty()
    public user: {};

    @ApiProperty()
    public token: string;

    @ApiProperty()
    public cookie: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    public constructor(
        private configService: ConfigService,
        @Inject(LoginService)
        private loginService: LoginService,
        @Inject(SendPasswordResetRequestService)
        private sendPasswordResetRequestService: SendPasswordResetRequestService,
        @Inject(ResetPasswordService)
        private resetPasswordService: ResetPasswordService,
    ) {}

    @ApiResponse({
        status: 200,
        description: 'Provides user entity, jwt token and cookie.',
        type: authenticatedData,
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
        try {
            const { user, cookie, token } = await this.loginService.execute(
                loginDto,
            );

            resp.setHeader('Set-Cookie', cookie);

            return resp.send(user);
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Usuário ou senha inválida',
                HttpStatus.UNAUTHORIZED,
            );
        }
    }

    @ApiResponse({
        status: 201,
        description: 'Sends user mail to change password.',
    })
    @ApiResponse({
        status: 404,
        description: 'Erro ao realizar recuperação de senha',
    })
    @Post('send-password-reset-request')
    public async requestResetPassword(
        @Body() passowordResetRequestDto: PasswordResetRequestDTO,
    ) {
        try {
            await this.sendPasswordResetRequestService.execute(
                passowordResetRequestDto,
            );

            return response.status(200);
        } catch (error) {
            throw new HttpException(
                'Erro ao realizar recuperação de senha',
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @ApiResponse({
        status: 201,
        description: 'Sets password to new one.',
    })
    @ApiResponse({
        status: 404,
        description: 'Erro ao realizar troca de senha',
    })
    @ApiResponse({
        status: 422,
        description: 'Token inválido',
    })
    @Post('reset-password')
    public async resetPassword(@Body() resetPasswordDto: ResetPasswordDTO) {
        try {
            await this.resetPasswordService.execute(resetPasswordDto);

            return response.status(200);
        } catch (error) {
            if (error instanceof InvalidTokenException) {
                throw new HttpException(
                    'Token inválido',
                    HttpStatus.UNPROCESSABLE_ENTITY,
                );
            }

            throw new HttpException(
                'Erro ao realizar troca de senha',
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @ApiResponse({
        status: 200,
        description:
            'Provides single user entity from database, based on logged user.',
    })
    @ApiResponse({
        status: 400,
        description: 'Search error.',
    })
    @ApiResponse({
        status: 404,
        description: 'Not found.',
    })
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('user')
    public async getAuthenticatedUser(@Req() request: Request) {
        return request;
    }

    @ApiResponse({
        status: 200,
        description: 'Clears jwt cookie on browser',
    })
    @ApiResponse({
        status: 404,
        description: 'Not found',
    })
    @Get('logout')
    public async logout(@Res() resp: Response) {
        try {
            resp.setHeader(
                'Set-Cookie',
                `Authentication=0; Domain=${this.configService.get(
                    'COOKIE_DOMAIN',
                )}; HttpOnly; Path=/; Max-Age=1`,
            );
            resp.clearCookie('Authentication');

            return resp.send();
        } catch (error) {
            throw new HttpException(
                'Erro ao fazer logout',
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
