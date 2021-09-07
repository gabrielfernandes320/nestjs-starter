import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import LoginDTO from '../../dtos/LoginDTO';
import LoginService from '../../services/LoginService';
import ForgotPasswordService from '../../services/ForgotPasswordService';
import { Response, Request } from 'express';
import { LocalAuthGuard } from '../../guards/LocalAuthGuard';
import JwtAuthenticationGuard from '../../guards/JwtAuthenticationGuard';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import ForgotPasswordDTO from '../../dtos/ForgotPasswordDTO';
import ChangePasswordDTO from '../../dtos/ChangePasswordDTO';
import ChangePasswordService from '../../services/ChangePasswordService';

@ApiTags('Auth')
@Controller({
    version: '1',
    path: 'auth',
})
export class AuthController {
    public constructor(
        private loginService: LoginService,
        private changePasswordService: ChangePasswordService,
        private forgotPasswordService: ForgotPasswordService,
    ) {}

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
    public async login(@Body() loginDto: LoginDTO, @Res() resp: Response) {
        const { user, cookie, token, cookieRefreshToken } =
            await this.loginService.execute(loginDto);

        resp.setHeader('Set-Cookie', [cookie, cookieRefreshToken]);
        // resp.setHeader('Set-Cookie', cookieRefreshToken);

        return resp.send({ user });
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

    @ApiResponse({
        status: 201,
        description: 'Sends user mail to change password.',
    })
    @ApiResponse({
        status: 404,
        description: 'Erro ao realizar recuperação de senha',
    })
    @Post('password/forgot')
    public async forgotPassword(
        @Body() forgotPasswordDTO: ForgotPasswordDTO,
        @Res() resp: Response,
    ) {
        await this.forgotPasswordService.execute(forgotPasswordDTO);

        return resp.status(200).send();
    }

    @ApiResponse({
        status: 201,
        description: 'Password altered sucessful',
    })
    @Post('password/reset')
    public async changePassword(@Body() changePasswordDto: ChangePasswordDTO) {
        return await this.changePasswordService.execute(changePasswordDto);
    }
}
