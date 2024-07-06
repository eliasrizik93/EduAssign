import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly question: any;

  @IsNotEmpty()
  @IsString()
  readonly answer: any;

  @IsNotEmpty()
  @IsString()
  readonly groupId: string;

  @IsOptional()
  @IsDateString()
  readonly createdAt?: string;

  @IsOptional()
  @IsDateString()
  readonly updatedAt?: string;
}
