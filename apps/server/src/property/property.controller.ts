import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Patch,
  Param,
  Get,
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

  @Post('register')
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPropertyDto: CreatePropertyDto,
  ): Promise<Property> {
    const imageUrls = await this.imageService.uploadImages(files);

    const propertyData = {
      ...createPropertyDto,
      photos: imageUrls,
    };

    return this.propertyService.create(propertyData);
  }

  @Patch(':id')
  async update(
    @Param('id', ObjectIdValidationPipe) propertyId: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    return this.propertyService.update(propertyId, updatePropertyDto);
  }
}
