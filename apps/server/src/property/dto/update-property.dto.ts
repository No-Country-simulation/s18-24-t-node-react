import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
  @ApiPropertyOptional({
    example: [
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.jpg',
      'https://example.com/photo3.jpg',
    ],
    description: 'Property photo URLs. Must include at least 3 photos.',
  })
  @IsOptional()
  @ArrayMinSize(3)
  @IsUrl({}, { each: true })
  readonly photos?: string[];

  @ApiPropertyOptional({
    example: 4,
    description: 'Maximum number of people that can stay in the property',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly max_people?: number;

  @ApiPropertyOptional({
    example: ['beachfront', 'wifi', 'pets allowed'],
    description: 'Optional tags that describe the property',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tags?: string[];
}
