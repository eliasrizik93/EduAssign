import { Controller, Post, Body, Res, HttpCode, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtAuthGuard: JwtAuthGuard,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const { access_token, profile } = await this.userService.login(
      loginUserDto,
    );

    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'strict',
    });

    return res.send({ profile });
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies.jwt;
    this.jwtAuthGuard.blacklistToken(token);
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return res.send({ message: 'Logout successful' });
  }
}
