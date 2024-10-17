import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class PropertyParamsDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsArray()
  tags: [];

  @IsOptional()
  @IsNumber()
  ascOrDesc: number;
}
