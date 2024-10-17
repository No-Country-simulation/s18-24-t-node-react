import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
    Logger.log('Se registra una nueva propiedad...');
    const { title, description, price, photos } = createPropertyDto;

    await this.propertyModel.find().sort({ date: -1 });

    const newProperty = new this.propertyModel({
      title,
      description,
      price,
      photos,
    });

    return await newProperty.save();
  }

  findAll() {
    return `This action returns all property`;
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
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

  remove(id: number) {
    return `This action removes a #${id} property`;
  }

  async findOneById(propertyId: string): Promise<Property> {
    const property = await this.propertyModel.findById(propertyId);

    if (!property)
      throw new NotFoundException(`Property with id ${propertyId} not found`);

    return property;
  }
}
