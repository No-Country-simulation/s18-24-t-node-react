import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: false })
export class Property extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  photos: string[];

  @Prop()
  max_people: number;

  @Prop()
  tags: string[];
}

export const PropertySchema = SchemaFactory.createForClass(Property);
