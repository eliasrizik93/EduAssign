import { Schema as MongooseSchema, Document, Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Card extends Document {
  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  question: string | Buffer;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  answer: string | Buffer;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Group', required: true })
  groupId: Types.ObjectId;

  @Prop({ default: 'new' })
  state: 'new' | 'inProgress' | 'restudy';

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);
