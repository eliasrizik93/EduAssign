import { Controller, Post, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @Post()
  async createUser(@Body() user: User) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
}
