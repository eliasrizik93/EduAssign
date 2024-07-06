import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { CardSchema } from './schemas/card.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
