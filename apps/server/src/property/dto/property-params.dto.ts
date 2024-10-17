import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsIn,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

type Orders = 'ASC' | 'DES';

export class PropertyParamsDto {
  @IsOptional()
  @IsString()
  title: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsArray()
  tags: [];

  @IsIn(['ASC', 'DES'])
  @IsOptional()
  orderBy: Orders;
}
