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
    const { title, description, price, availabilityDate, photos } = createPropertyDto;

    const date = new Date(availabilityDate);

    const newProperty = new this.propertyModel({
      title,
      description,
      price,
      availabilityDate: date, //También se puede enviar fecha mas la hora: 2024-10-15T14:30:00Z
      photos
    });

    return newProperty.save();
  }

  findAll() {
    return `This action returns all property`;
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
