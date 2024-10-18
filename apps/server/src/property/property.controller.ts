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
import { PropertyParamsDto } from './dto/property-params.dto';

@Controller('property')
export class PropertyController {
  constructor(
    private readonly imageService: ImageService,
    private readonly propertyService: PropertyService,
  ) { }

  @Get()
  async findAll(@Query() filterQuery: PropertyParamsDto) {
    return await this.propertyService.findAll(filterQuery);
  }

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
  ): Promise<Property> {
    return this.propertyService.update(propertyId, updatePropertyDto);
  }
}