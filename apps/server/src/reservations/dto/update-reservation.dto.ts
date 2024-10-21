import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';
import { ReservationState } from '../entities/reservation.entity';
import { Prop } from '@nestjs/mongoose';
import { IsDateString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {


    @IsOptional()
    @IsNumber()
    price?:number;

    @IsOptional()
    @IsDateString()
    start_date?: Date;

    @IsOptional()
    @IsDateString()
    end_date?: Date;

    @IsOptional()
    @IsEnum(ReservationState)
    state?: ReservationState;
}
