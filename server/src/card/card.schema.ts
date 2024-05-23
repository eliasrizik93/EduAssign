import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Card extends Document {
  @Prop({ type: Buffer })
  audio: Buffer;

  @Prop()
  text: string;
}
export const CardSchema = SchemaFactory.createForClass(Card);
