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
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';

@Controller('group')
@UseGuards(JwtAuthGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll(@Query('userEmail') userEmail: string) {
    return this.groupService.findByUserEmail(userEmail);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }

  @Post(':groupId/parent/:parentId')
  moveGroupToParent(
    @Param('groupId') groupId: string,
    @Param('parentId') parentId: string,
  ) {
    const newParentId = parentId === 'null' ? null : parentId;
    return this.groupService.moveGroupToParent(groupId, newParentId);
  }

  @Post(':groupId/move/:newParentId')
  moveGroupToAnotherChild(
    @Param('groupId') groupId: string,
    @Param('newParentId') newParentId: string,
  ) {
    return this.groupService.moveGroupToAnotherChild(groupId, newParentId);
  }
}
