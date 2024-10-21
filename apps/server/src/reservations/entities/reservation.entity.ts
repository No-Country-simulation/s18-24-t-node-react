import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export enum ReservationState {
    Pending = 'pending',
    Confirmed = 'confirmed',
    Cancelled = 'cancelled',
}

@Schema({ timestamps: true })
export class Reservation extends Document {

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    start_date: Date;

    @Prop({ required: true })
    end_date: Date;

    @Prop({ required: true, enum: ReservationState })
    state: ReservationState;

    
    @Prop({ type: Types.ObjectId, required:true, ref: 'User'})
    user_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, required:true, ref: 'Property'})
    property_id: Types.ObjectId;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);

