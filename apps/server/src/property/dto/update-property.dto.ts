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

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
  @IsOptional()
  @ArrayMinSize(3)
  @IsUrl({}, { each: true })
  readonly photos?: string[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly max_people?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tags?: string[];
}
