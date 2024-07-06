import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema()
export class Card extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  question: string | Buffer;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  answer: string | Buffer;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Group', required: true })
  group: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);
