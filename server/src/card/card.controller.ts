import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';

@Controller('card')
@UseGuards(JwtAuthGuard)
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Get()
  findAll(@Query('groupId') groupId: string) {
    if (groupId) {
      return this.cardService.findByGroupId(groupId);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(id);
  }
}

// @Post('upload')
// @UseInterceptors(FileInterceptor('audio'))
// async uploadCard(
//   @UploadedFile() file: Express.Multer.File,
//   @Body() body: { text: string },
// ) {
//   const createdCard = new this.cardModel({
//     audio: file.buffer,
//     text: body.text,
//   });
//   return createdCard.save();
// }

// @Get()
// async getAllCards() {
//   return this.cardModel.find().exec();
// }

// @Get(':id/audio')
// async getAudio(@Param('id') id: string, @Res() res: Response) {
//   const card = await this.cardModel.findById(id).exec();
//   if (card && card.audio) {
//     res.setHeader('Content-Type', 'audio/wav');
//     res.send(card.audio);
//   } else {
//     res.status(404).send('Audio not found');
//   }
// }
// }
