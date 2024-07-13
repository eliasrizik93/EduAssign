import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  readonly question: string;

  @IsNotEmpty()
  @IsString()
  readonly answer: string;

  @IsNotEmpty()
  @IsString()
  readonly groupId: string;

  @IsOptional()
  @IsString()
  readonly state?: 'new' | 'inProgress' | 'restudy';

  @IsOptional()
  @IsDateString()
  readonly createdAt?: string;

  @IsOptional()
  @IsDateString()
  readonly updatedAt?: string;
}
