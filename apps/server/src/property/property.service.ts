import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { PropertyParamsDto } from './dto/property-params.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
  ) {}

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
      photos,
    });

    return await newProperty.save();
  }

  async findAll(params: PropertyParamsDto) {
    const { title, price, tags, orderBy } = params;

    // Inicializar el filtro vacío
    const filters: any = {};

    // Agregar filtros solo si existen los parámetros
    if (title) {
      filters.title = { $regex: title, $options: 'i' }; // Búsqueda insensible a mayúsculas/minúsculas
    }

    if (price) {
      filters.price = { $gte: price }; // Usar operador $gte para mayor o igual
    }

    if (tags && tags.length > 0) {
      filters.tags = { $in: tags }; // Buscar propiedades que tengan todos los tags
    }

    // Construir la consulta
    let query = this.propertyModel.find(filters);

    // Si se incluye `orderBy`, aplicamos ordenamiento
    if (orderBy) {
      const sortOrder = orderBy === 'ASC' ? 1 : -1; // Conversión manual
      query = query.sort({ createdAt: sortOrder });
    }

    return await query.exec(); // Ejecutar la consulta con exec()
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
