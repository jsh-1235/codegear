import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(newUser: CreateUserDto): Promise<CreateUserDto> {
    const found: CreateUserDto = await this.userService.findByFields({
      where: { username: newUser.username },
    });

    if (found) {
      throw new HttpException(
        'Username already in use!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userService.save(newUser);
  }

  async login(
    user: CreateUserDto,
  ): Promise<{ accessToken: string } | undefined> {
    const found: User = await this.userService.findByFields({
      where: { username: user.username },
    });

    const validatedPassword = await bcrypt.compare(
      user.password,
      found.password,
    );

    console.log(found, validatedPassword);

    if (!found || !validatedPassword) {
      throw new UnauthorizedException();
    }

    this.convertInAuthorities(found);

    const payload: Payload = {
      id: found.id,
      username: found.username,
      authorities: found.authorities,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(payload: Payload): Promise<User | undefined> {
    // return await this.userService.findByFields({
    //   where: { id: payload.id },
    // });

    const userFind = await this.userService.findByFields({
      where: { id: payload.id },
    });

    this.flatAuthorities(userFind);

    return userFind;
  }

  private flatAuthorities(user: any): User {
    if (user && user.authorities) {
      const authorities: string[] = [];
      user.authorities.forEach((authority) =>
        authorities.push(authority.authorityName),
      );
      user.authorities = authorities;
    }
    return user;
  }

  private convertInAuthorities(user: any): User {
    if (user && user.authorities) {
      const authorities: any[] = [];
      user.authorities.forEach((authority) =>
        authorities.push({ name: authority.authorityName }),
      );
      user.authorities = authorities;
    }
    return user;
  }
}
