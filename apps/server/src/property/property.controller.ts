import { Controller, Post, Body, Patch, Param } from '@nestjs/common';

import { PropertyService } from './property.service';
import { Property } from './entities/property.entity';
import { CreatePropertyDto, UpdatePropertyDto } from './dto';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post('register')
  async create(
    @Body() createPropertyDto: CreatePropertyDto,
  ): Promise<Property> {
    return this.propertyService.create(createPropertyDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ObjectIdValidationPipe) propertyId: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(propertyId, updatePropertyDto);
  }
}
