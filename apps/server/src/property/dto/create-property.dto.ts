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

  @IsNumber()
  readonly price: number;

  @ArrayMinSize(3)
  @IsUrl({}, { each: true })
  readonly photos: string[];

  @IsNumber()
  @Min(1)
  readonly max_people: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tags?: string[];
}
