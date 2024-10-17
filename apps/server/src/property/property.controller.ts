import { Controller, Get, Post, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { PropertyService } from './property.service';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertyParamsDto } from './dto/property-params.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post('register') 
  async create(@Body() createPropertyDto: CreatePropertyDto): Promise<Property> {
    return this.propertyService.create(createPropertyDto);
  }
  
  @Get()
  async findAll(@Query() filterQuery: PropertyParamsDto) {
    return await this.propertyService.findAll(filterQuery);
  }

  /*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertyService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyService.remove(+id);
  }
  */
}
