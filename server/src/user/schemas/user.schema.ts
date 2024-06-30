import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: true })
  birthday: string;

  @Prop({ required: true, enum: ['Male', 'Female'] })
  gender: 'Male' | 'Female';
}

export const UserSchema = SchemaFactory.createForClass(User);
