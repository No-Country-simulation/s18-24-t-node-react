import { Controller, Post, Body, UseInterceptors, UploadedFiles, Logger, Patch, Param, Delete, Get } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PropertyService } from './property.service';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ImageService } from './image.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService, 
              private readonly imageService: ImageService) {}

  @Post('register')
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPropertyDto: CreatePropertyDto
  ): Promise<Property> {

    const imageUrls = await this.imageService.uploadImages(files);
    
    Logger.log('[property.controller] imageUrls --> ' + imageUrls);
    Logger.log('Longitud:', imageUrls.length);

    const propertyData = {
      ...createPropertyDto,
      photos: imageUrls, // Agrega las URLs de las imágenes al objeto de propiedad
    };

    return this.propertyService.create(propertyData);
  }
  
  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

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

}
