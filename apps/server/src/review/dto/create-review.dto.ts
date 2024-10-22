import { IsString, IsEmail, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: '6710567b8c62da71492c4ca4', description: 'id de property', required: true })
  @IsString()
  @IsNotEmpty()
  property: string;

  @ApiProperty({ example: '6710567b8c62da71492c4ca4', description: 'id de user', required: true })
  @IsString()
  @IsNotEmpty()
  guest: string;

  @ApiProperty({ example: 5, description: 'Rating', required: true })
  @IsString()
  @IsOptional()
  rating: number;

  @ApiProperty({ example: 'Great place', description: 'Comment', required: true })
  @IsString()
  @IsOptional()
  comment: string;
}