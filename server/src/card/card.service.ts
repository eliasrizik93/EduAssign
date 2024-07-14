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

  async create(createCardDto: CreateCardDto) {
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

      return createCard;
    } catch (error) {
      throw new Error(`Failed to create card: ${error.message}`);
    }
  }

  findByGroupId(groupId: string): Promise<Card[]> {
    return this.cardModel.find({ groupId: new Types.ObjectId(groupId) }).exec();
  }

  findById(id: string) {
    return this.cardModel.findById(id).exec();
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    console.log('Updating card with ID:', id);

    if (!id) {
      throw new Error('No ID provided');
    }

    // Mongoose's findById method automatically handles converting string IDs to ObjectId, and throws if invalid
    const card = await this.cardModel.findById(id).exec();
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    // Using the $set operator to ensure only provided fields are updated
    const updatedCard = await this.cardModel
      .findByIdAndUpdate(id, { $set: updateCardDto }, { new: true })
      .exec();
    if (!updatedCard) {
      throw new NotFoundException(`Failed to update card with ID ${id}`);
    }

    return updatedCard;
  }

  async remove(id: string) {
    const result = await this.cardModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    const group = await this.groupModel.findById(result.groupId).exec();
    if (group) {
      group.cards = group.cards.filter((cardId) => !cardId.equals(result._id));
      group.totalCards--;
      await group.save();
    }
  }
}
