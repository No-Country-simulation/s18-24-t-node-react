import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
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

  /*@Prop({ type: Types.ObjectId, required:true, ref: 'User'})
    user_id: Types.ObjectId; */
}

export const PropertySchema = SchemaFactory.createForClass(Property);
