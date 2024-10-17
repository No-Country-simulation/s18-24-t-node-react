import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertyService {
  constructor(@InjectModel(Property.name) private propertyModel: Model<Property>) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    Logger.log('Se registra una nueva propiedad...');
    const { title, description, price, photos } = createPropertyDto;

    /*
    const existingProperty = await this.propertyModel.findOne({ email });
    if (existingProperty) {
      throw new BadRequestException('Email already in use');
    }
    */

    const newProperty = new this.propertyModel({
      title,
      description,
      price,
      photos
    });

    return await newProperty.save();
  }

  async findAll() {
    return await this.propertyModel.find().sort({createdAt: -1});
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
