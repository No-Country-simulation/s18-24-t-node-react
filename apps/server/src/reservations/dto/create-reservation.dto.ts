
import { IsMongoId, IsNotEmpty, IsDateString, IsEnum, IsNumber } from 'class-validator';
import { ReservationState } from './../entities/reservation.entity'

export class CreateReservationDto {

  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @IsMongoId()
  @IsNotEmpty()
  property_id: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsDateString()
  @IsNotEmpty()
  start_date: Date;

  @IsDateString()
  @IsNotEmpty()
  end_date: Date;

  @IsEnum(ReservationState)
  @IsNotEmpty()
  state: ReservationState;
}
