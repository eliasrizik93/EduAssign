import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema()
export class Group extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Card', default: [] })
  cards: Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Group', default: null })
  parent: Types.ObjectId;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Group', default: [] })
  children: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
