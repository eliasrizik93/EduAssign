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
