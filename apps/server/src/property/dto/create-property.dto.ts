import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @Type(() => Number)
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @ArrayMinSize(3)
  @IsUrl({}, { each: true })
  readonly photos?: string[];

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  readonly max_people: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tags?: string[];
}