import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './schemas/group.schema';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';

@Controller('group')
@UseGuards(JwtAuthGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupService.create(createGroupDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Group> {
    return this.groupService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    return this.groupService.update(id, updateGroupDto);
  }

  @Put(':sourceId/:targetId')
  async updateGroupPosition(
    @Param('sourceId') sourceId: string,
    @Param('targetId') targetId: string,
  ): Promise<Group[]> {
    return this.groupService.updatePosition(sourceId, targetId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Group[]> {
    return this.groupService.remove(id);
  }

  @Get('user/:email')
  async findByUserEmail(@Param('email') email: string): Promise<Group[]> {
    return this.groupService.findByUserEmail(email);
  }
}
