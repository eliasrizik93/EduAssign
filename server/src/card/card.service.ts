import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './schemas/card.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Group } from 'src/group/schemas/group.schema';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<Group> {
    try {
      const createCard = new this.cardModel(createCardDto);
      await createCard.save();

      const group = await this.groupModel.findById(createCard.groupId).exec();
      if (!group) {
        throw new NotFoundException(
          `Group with ID ${createCard.groupId} not found`,
        );
      }

      group.cards.push(createCard._id);
      group.totalCards += 1;
      group.new += 1;
      await group.save();

      return group;
    } catch (error) {
      console.error('Error creating card:', error.message);
      console.error('Error details:', error);
      throw new Error(`Failed to create card: ${error.message}`);
    }
  }

  async reviewCard(id: string, performanceRating: number): Promise<Card> {
    const card = await this.cardModel.findById(id);
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    card.repetitions = performanceRating >= 3 ? card.repetitions + 1 : 0;
    card.easinessFactor = Math.max(
      1.3,
      card.easinessFactor -
        0.8 +
        0.28 * performanceRating -
        0.02 * performanceRating * performanceRating,
    );
    card.interval =
      card.repetitions <= 1
        ? 1
        : card.repetitions === 2
        ? 6
        : Math.ceil(card.interval * card.easinessFactor);

    await card.save();
    return card;
  }

  findByGroupId(groupId: string): Promise<Card[]> {
    return this.cardModel.find({ groupId: new Types.ObjectId(groupId) }).exec();
  }

  findById(id: string) {
    return this.cardModel.findById(id).exec();
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    if (!id) {
      throw new Error('No ID provided');
    }

    const card = await this.cardModel.findById(id).exec();
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    const updatedCard = await this.cardModel
      .findByIdAndUpdate(id, { $set: updateCardDto }, { new: true })
      .exec();
    if (!updatedCard) {
      throw new NotFoundException(`Failed to update card with ID ${id}`);
    }

    return updatedCard;
  }

  async remove(id: string): Promise<Group> {
    const result = await this.cardModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    const group = await this.groupModel.findById(result.groupId).exec();
    if (group) {
      group.cards = group.cards.filter((cardId) => !cardId.equals(result._id));
      group.totalCards--;
      group[result.state]--;
      await group.save();
      return group;
    }
  }
}
