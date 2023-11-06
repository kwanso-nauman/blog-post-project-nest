import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>,
  ) { }

  /**
   * Gets all users
   */
  async getAllUsers() {
    try {
      return await this.usersRepository.find();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  /**
   * Creates user
   * @param createUserInput 
   */
  async createUser(createUserInput: CreateUserInput) {
    try {

    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
