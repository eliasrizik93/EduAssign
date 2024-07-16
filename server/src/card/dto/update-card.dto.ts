// src/cards/dto/update-card.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateCardDto } from './create-card.dto';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsOptional()
  @IsNumber()
  easinessFactor?: number;

  @IsOptional()
  @IsNumber()
  interval?: number;

  @IsOptional()
  @IsNumber()
  repetitions?: number;
}
