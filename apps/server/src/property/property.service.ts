import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
  ) { }

   async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const { title, description, price, photos, max_people, tags } =
      createPropertyDto;

    const newProperty = new this.propertyModel({
      title,
      description,
      price,
      photos,
      max_people,
      tags,
    });

    return newProperty.save();
  }

  findAll() {
    return `This action returns all property`;
  }

  async update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    await this.findOneById(id);

    const updatedProperty = this.propertyModel.findByIdAndUpdate(
      id,
      updatePropertyDto,
      { new: true },
    );

    return updatedProperty;
  }

  async remove(id: number): Promise<Property> {
    return this.propertyModel.findByIdAndDelete(id).exec();
  }

  async findOneById(propertyId: string): Promise<Property> {
    const property = await this.propertyModel.findById(propertyId);

    if (!property)
      throw new NotFoundException(`Property with id ${propertyId} not found`);

    return property;
  }
}
