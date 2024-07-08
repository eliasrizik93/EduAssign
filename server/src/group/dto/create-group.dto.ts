import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayUnique,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly userEmail: string;

  @IsOptional()
  @IsString()
  readonly parentGroupId?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  readonly cardsId?: string[];

  @IsOptional()
  @IsNumber()
  readonly totalCards: number = 0;

  @IsOptional()
  @IsNumber()
  readonly new: number = 0;

  @IsOptional()
  @IsNumber()
  readonly inProgress: number = 0;

  @IsOptional()
  @IsNumber()
  readonly studied: number = 0;
}
