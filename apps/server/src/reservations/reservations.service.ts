import { ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from './entities/reservation.entity'
import { User } from '../users/entities/user.entity'
import { Property } from '../property/entities/property.entity'



@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Property.name) private PropertyModel: Model<Property>

  
  ) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const{user_id, property_id, price, start_date, end_date, state} = createReservationDto;
    

    const userExists = await this.userModel.findById(user_id).exec();
    if (!userExists) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    const propertyExist = await this.PropertyModel.findById(property_id).exec();
    if(!propertyExist){
      throw new NotFoundException(`Property with ID ${property_id} not found`)
    }

    const conflictingReservation = await this.reservationModel.find({
      property_id,
      state : 'confirmed',
      $or: [
        {
          $and: 
              [
              {start_date: {$lte: end_date}},
              {end_date: {$gte: start_date}}
            ]
        }
      ]
    }).exec();
    
    if (conflictingReservation.length > 0 ){
      throw new ConflictException(`Property width ID ${property_id} is already reserved for de selected dates`);
    }
    

    const newReservation = new this.reservationModel({
      user_id,
      property_id,
      price, 
      start_date, 
      end_date, 
      state: state.toLowerCase()
    });
    return newReservation.save();
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel.find().exec();
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.reservationModel.findById(id).exec();
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const updatedReservation = await this.reservationModel.findByIdAndUpdate(id, updateReservationDto, { new: true }).exec();
    if (!updatedReservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return updatedReservation;
  }

  async remove(id: string): Promise<Reservation> {
    return this.reservationModel.findByIdAndDelete(id).exec();
    }
}
