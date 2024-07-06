import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayUnique,
  IsEmail,
} from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly userEmail: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsString({ each: true })
  readonly cardsId: string[];

  @IsOptional()
  @IsString()
  readonly parentGroupId?: string;

  @IsOptional()
  @IsDateString()
  readonly createdAt?: string;

  @IsOptional()
  @IsDateString()
  readonly updatedAt?: string;
}
