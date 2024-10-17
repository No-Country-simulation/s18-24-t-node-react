import { IsString, IsNumber, IsDateString, IsArray, IsNotEmpty } from 'class-validator';

export class CreatePropertyDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    readonly price: number;

    @IsDateString()
    readonly availabilityDate: string;

    @IsArray()
    @IsString({ each: true })
    readonly photos: string[];
}
