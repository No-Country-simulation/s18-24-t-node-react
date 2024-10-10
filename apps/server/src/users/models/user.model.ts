import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
/*import { Property } from './property.model';
import { Booking } from './booking.model';
import { Review } from './review.model';*/

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['guest', 'host'], default: 'guest' })
  role: string;
  /*
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Property' }] })
  properties: Property[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Booking' }] })
  bookings: Booking[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Review' }] })
  reviews: Review[];
  */
}

export const UserSchema = SchemaFactory.createForClass(User);
