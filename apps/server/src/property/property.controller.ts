import { PropertyParamsDto } from './dto/property-params.dto';
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Patch,
  Param,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PropertyService } from './property.service';
import { Property } from './entities/property.entity';
import { ImageService } from './image.service';
import { CreatePropertyDto, UpdatePropertyDto } from './dto';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';

@Controller('property')
export class PropertyController {
  constructor(
    private readonly imageService: ImageService,
    private readonly propertyService: PropertyService,
  ) { }

  @Get(':id')
  async find(
    @Param('id', ObjectIdValidationPipe) propertyId: string,
  ): Promise<Property> {
    return this.propertyService.findOneById(propertyId);
  }
  
  @Get()
  async findAll(@Query() filterQuery: PropertyParamsDto) {
    return await this.propertyService.findAll(filterQuery);
  }
}
