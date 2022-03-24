import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './security/jwt.auth.guard';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from './security/roles.guard';
import { RoleType } from './role-type';
import { Roles } from './decorator/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(
    @Req() req: Request,
    @Body() createUserDto: CreateUserDto,
  ): Promise<any> {
    return await this.authService.register(createUserDto);
  }

  @Post('/login')
  async login(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    const jwt = await this.authService.login(createUserDto);

    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);

    // console.log(jwt.accessToken);

    res.cookie('jwt', jwt.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1 day
    });
    return res.send({
      message: 'login success',
    });

    // return res.json(jwt);
  }

  @Post('/logout')
  logout(@Req() req: Request, @Res() res: Response): any {
    res.cookie('jwt', '', {
      maxAge: 0,
    });

    return res.send({
      message: 'login success',
    });
  }

  @Get('/authenticate')
  @UseGuards(JwtAuthGuard)
  isAuthenticated(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }

  @Get('/admin-role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  adminRole(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }
}
