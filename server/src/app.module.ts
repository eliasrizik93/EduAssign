import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardModule } from './card/card.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    CardModule,
    UserModule,
    GroupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
