import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './schemas/group.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const { name, userEmail } = createGroupDto;

    // Check if a group with the same name and userEmail already exists
    const existingGroup = await this.groupModel
      .findOne({ name, userEmail })
      .exec();

    if (existingGroup) {
      // Return the existing group or handle the conflict as needed
      throw new ConflictException(
        'Group with this name already exists for this user',
      );
    }

    // If it does not exist, create a new group
    const createGroup = new this.groupModel(createGroupDto);
    return createGroup.save();
  }

  findByUserEmail(userEmail: string): Promise<Group[]> {
    return this.groupModel
      .find({ userEmail, parent: null })
      .populate({
        path: 'children',
        populate: { path: 'children', populate: { path: 'children' } }, // Deep populate children
      })
      .exec();
  }

  async findOne(id: string): Promise<Group> {
    const group = await this.groupModel
      .findById(id)
      .populate('cards')
      .populate('children')
      .exec();
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const updatedGroup = await this.groupModel
      .findByIdAndUpdate(id, updateGroupDto, { new: true })
      .exec();
    if (!updatedGroup) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return updatedGroup;
  }

  async updatePosition(idSource: string, idTarget: string): Promise<Group[]> {
    const groupSource = await this.groupModel.findById(idSource).exec();
    const groupTarget = await this.groupModel.findById(idTarget).exec();

    if (!groupSource) {
      throw new NotFoundException(`Source group with id ${idSource} not found`);
    }
    if (!groupTarget) {
      throw new NotFoundException(`Target group with id ${idTarget} not found`);
    }

    // Remove groupSource from its current parent's children array if it has a parent
    if (groupSource.parent) {
      const currentParent = await this.groupModel
        .findById(groupSource.parent)
        .exec();
      if (currentParent) {
        currentParent.children = currentParent.children.filter(
          (childId) => !childId.equals(groupSource._id),
        );
        await currentParent.save();
      }
    }

    // Set the new parent for groupSource
    groupSource.parent = groupTarget._id;

    // Add groupSource to groupTarget's children array
    if (!groupTarget.children.includes(groupSource._id)) {
      groupTarget.children.push(groupSource._id);
    }

    // Save the updated groupSource and groupTarget
    await groupSource.save();
    await groupTarget.save();

    // Return all groups with populated children and parent fields
    return this.findByUserEmail(groupSource.userEmail);
  }

  async remove(id: string): Promise<Group[]> {
    const group = await this.groupModel.findById(id).exec();
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    // Find and delete all child groups recursively
    const childGroups = await this.groupModel
      .find({ parent: group._id })
      .exec();
    for (const childGroup of childGroups) {
      await this.remove(childGroup._id.toString());
    }

    if (group.parent) {
      const parentGroup = await this.groupModel.findById(group.parent).exec();
      if (parentGroup) {
        parentGroup.children = parentGroup.children.filter(
          (childId) => !childId.equals(group._id), // Filter out the group ID from the parent's children array
        );
        await parentGroup.save();
      }
    }

    // Delete the group itself
    await this.groupModel.deleteOne({ _id: group._id }).exec();
    return this.findByUserEmail(group.userEmail);
  }
}
