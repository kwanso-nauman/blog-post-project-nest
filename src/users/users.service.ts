import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
      return await this.usersRepository.save(createUserInput);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  /**
   * Finds one by email
   * @param email 
   * @returns one by email 
   */
  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<User> {
    try {
      return this.usersRepository.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
