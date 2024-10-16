import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PropertyDocument = HydratedDocument<Property>;

@Schema()
export class Property {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Date })
  availabilityDate: Date;

  @Prop({ type: String })
  photos: string[];
}

export const PropertySchema = SchemaFactory.createForClass(Property);
