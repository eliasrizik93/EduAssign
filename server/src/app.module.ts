import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './card/card.schema';
import { CardController } from './card/card.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://eliasrizik93:ZxTzZrdPKkG4gttl@eduassigncluster.mdcapra.mongodb.net/?retryWrites=true&w=majority&appName=EduAssignCluster',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  controllers: [CardController],
  providers: [],
})
export class AppModule {}
