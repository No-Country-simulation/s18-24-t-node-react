import { Injectable, NotFoundException } from '@nestjs/common';
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
    const {
      title,
      description,
      price,
      max_people,
      tags,
      photos,
      address,
      coordinates,
    } = createPropertyDto;

    const newProperty = new this.propertyModel({
      title,
      description,
      price,
      photos,
      max_people,
      tags,
      address,
      coordinates: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
    });

    return newProperty.save();
  }

  async findAll(params: PropertyParamsDto) {
    const { title, minPrice, maxPrice, tags, orderBy, location } = params;

    // Inicializar el filtro vacío
    const filters: any = {};

    // Agregar filtros solo si existen los parámetros
    if (title) {
      filters.title = { $regex: title, $options: 'i' }; // Búsqueda insensible a mayúsculas/minúsculas
    }

    // Filtro por rango de precios
    if (minPrice !== undefined || maxPrice !== undefined) {
      filters.price = {};
      if (minPrice !== undefined) {
        filters.price.$gte = minPrice;
      }
      if (maxPrice !== undefined) {
        filters.price.$lte = maxPrice;
      }
    }

    if (tags && tags.length > 0) {
      filters.tags = { $in: tags }; // Buscar propiedades que tengan todos los tags
    }

    // Construir la consulta
    let query = this.propertyModel.find(filters);

    // Ordenar por precio de menor a mayor
    query = query.sort({ price: 1 }); // Usar 1 para ascendente, -1 para descendente

    // Si se incluye `orderBy`, aplicamos ordenamiento
    if (orderBy) {
      const sortOrder = orderBy === 'ASC' ? 1 : -1; // Conversión manual
      query = query.sort({ createdAt: sortOrder });
    }

    // Filtro por zona si está presente (búsqueda flexible con regex)
    if (location) {
      filters.address = { $regex: location, $options: 'i' }; // Buscar en el campo 'address' por coincidencias parciales
    }

    return await query.exec(); // Ejecutar la consulta con exec()
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
