import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './schemas/card.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
  ) {}

  create(createCardDto: CreateCardDto) {
    const createCard = new this.cardModel(createCardDto);
    return createCard.save();
  }

  findByGroupId(groupId: string): Promise<Card[]> {
    return this.cardModel.find({ group: groupId }).exec();
  }

  findById(id: string) {
    return this.cardModel.findOne({ id }).exec();
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const updatedCard = await this.cardModel
      .findOneAndUpdate({ id }, updateCardDto, { new: true })
      .exec();
    if (!updatedCard) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return updatedCard;
  }

  async remove(id: string) {
    const result = await this.cardModel.findOneAndDelete({ id }).exec();
    if (!result) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
  }
}
