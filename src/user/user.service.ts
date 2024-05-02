import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User, { SystemRole } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // confirm if user already exists with email using query builder
    const query = this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email: createUserDto.email })
      .getOne();

    const userExists = await query;

    if (userExists) {
      throw new Error('User already exists');
    }
    // hash password
    const hashedPassword = await argon2.hash(createUserDto.password);

    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = hashedPassword;
    user.systemRole = createUserDto.systemRole || SystemRole.INTEGRATOR; 

    const savedUser = await this.userRepo.save(user);
    return savedUser;
  }

  async getAllUsers(): Promise<User[]> {
    try {
      // get users query builder but exclude password
      const query = this.userRepo
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.firstName',
          'user.lastName',
          'user.email',
          'user.systemRole',
        ]);

      const users = await query.getMany();

      return users;
    } catch (err) {
      console.log(err);
      throw new Error('An error was encountered while fetching users');
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.userRepo.findOneBy({ id: id });
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepo.findOne({
        where: {
          email: email,
        },
      });

      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async remove(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }
}
