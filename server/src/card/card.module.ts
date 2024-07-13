import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { CardSchema } from './schemas/card.schema';

import { UserModule } from 'src/user/user.module';
import { Group, GroupSchema } from 'src/group/schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }]),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    UserModule,
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
