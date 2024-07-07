import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { CardSchema } from './schemas/card.schema';

import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }]),
    UserModule,
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
