import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async findByFields(
    options: FindOneOptions<CreateUserDto>,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne(options);
  }

  async save(user: CreateUserDto): Promise<CreateUserDto | undefined> {
    await this.transformPassword(user);

    console.log(user);

    return await this.userRepository.save(user);
  }

  async transformPassword(user: CreateUserDto): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);

    return Promise.resolve();
  }
}
