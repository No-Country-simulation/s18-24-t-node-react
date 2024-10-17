import { Controller, Post, Body, Patch, Param, Delete, Get } from '@nestjs/common';

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

  @Get('get/:id')
  async findOneById(@Param('id') id: string) {
    return this.propertyService.findOneById(id);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    return this.propertyService.remove(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ObjectIdValidationPipe) propertyId: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(propertyId, updatePropertyDto);
  }
}
