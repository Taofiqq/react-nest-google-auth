import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async login({
    email,
    name,
    image,
  }: {
    email: string;
    name: string;
    image: string;
  }): Promise<any> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      const newUser = new this.userModel({ email, name, image });
      await newUser.save();
      return newUser;
    } else {
      console.log(user);
      return user;
    }
  }
}
