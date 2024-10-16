import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
export class Property extends Document {
  @Prop({required: true})
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  availabilityDate: Date;

  @Prop({ required: true })
  photos: string[];

}

export const PropertySchema = SchemaFactory.createForClass(Property);