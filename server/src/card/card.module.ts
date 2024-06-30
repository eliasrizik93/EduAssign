import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from './card.schema';
import { CardController } from './card.controller';
import { UserModule } from '../user/user.module'; // Import the UserModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }]),
    UserModule, // Add UserModule to imports
  ],
  controllers: [CardController],
  providers: [],
})
export class CardModule {}
