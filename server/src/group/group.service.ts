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
      .find({ userEmail })
      .populate('cards')
      .populate('children')
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

    // Delete the group itself
    await this.groupModel.deleteOne({ _id: group._id }).exec();
    return this.findByUserEmail(group.userEmail);
  }

  async moveGroupToParent(
    groupId: string,
    parentId: string | null,
  ): Promise<void> {
    const group = await this.groupModel.findById(groupId).exec();
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    if (parentId) {
      const parentGroup = await this.groupModel.findById(parentId).exec();
      if (!parentGroup) {
        throw new NotFoundException(
          `Parent Group with ID ${parentId} not found`,
        );
      }

      // Update the parent of the group
      group.parent = parentGroup._id;
      await group.save();

      // Add the group to the parent's children
      parentGroup.children.push(group._id);
      await parentGroup.save();
    } else {
      // Remove the group from its current parent's children array
      if (group.parent) {
        const currentParentGroup = await this.groupModel
          .findById(group.parent)
          .exec();
        if (currentParentGroup) {
          currentParentGroup.children = currentParentGroup.children.filter(
            (childId) => !childId.equals(group._id),
          );
          await currentParentGroup.save();
        }
      }

      // Set the group's parent to null (make it a top-level group)
      group.parent = null;
      await group.save();
    }
  }

  async moveGroupToAnotherChild(
    groupId: string,
    newParentId: string,
  ): Promise<void> {
    const group = await this.groupModel.findById(groupId).exec();
    const newParentGroup = await this.groupModel.findById(newParentId).exec();

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }
    if (!newParentGroup) {
      throw new NotFoundException(
        `Parent Group with ID ${newParentId} not found`,
      );
    }

    // Remove the group from its current parent's children array
    if (group.parent) {
      const currentParentGroup = await this.groupModel
        .findById(group.parent)
        .exec();
      if (currentParentGroup) {
        currentParentGroup.children = currentParentGroup.children.filter(
          (childId) => !childId.equals(group._id),
        );
        await currentParentGroup.save();
      }
    }

    // Update the parent of the group to the new parent
    group.parent = newParentGroup._id;
    await group.save();

    // Add the group to the new parent's children array
    newParentGroup.children.push(group._id);
    await newParentGroup.save();
  }
}
