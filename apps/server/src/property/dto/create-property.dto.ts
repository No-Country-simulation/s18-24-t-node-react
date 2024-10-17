import { IsString, IsNumber, IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePropertyDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    readonly price: number;

    @IsString()
    @IsNotEmpty()
    readonly availabilityDate: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    readonly photos?: string[]; 
}
