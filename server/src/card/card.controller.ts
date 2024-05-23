import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card } from './card.schema';
import { Response } from 'express';

@Controller('cards')
export class CardController {
  constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('audio'))
  async uploadCard(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { text: string },
  ) {
    const createdCard = new this.cardModel({
      audio: file.buffer,
      text: body.text,
    });
    return createdCard.save();
  }

  @Get()
  async getAllCards() {
    return this.cardModel.find().exec();
  }

  @Get(':id/audio')
  async getAudio(@Param('id') id: string, @Res() res: Response) {
    const card = await this.cardModel.findById(id).exec();
    if (card && card.audio) {
      res.setHeader('Content-Type', 'audio/wav');
      res.send(card.audio);
    } else {
      res.status(404).send('Audio not found');
    }
  }
}
