import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...rest } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 12);
      const createdUser = new this.userModel({
        ...rest,
        password: hashedPassword,
      });
      return createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.findByEmail(email);
    const passwordEqual = await bcrypt.compare(pass, user.password);
    if (user && passwordEqual) {
      const userWithoutPassword = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        birthday: user.birthday,
        gender: user.gender,
      };

      return userWithoutPassword;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
      profile: user,
    };
  }
}
