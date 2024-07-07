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
  HttpStatus,
  HttpException,
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
  async create(@Body() createCardDto: CreateCardDto) {
    try {
      const result = await this.cardService.create(createCardDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Card created successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to create card: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
