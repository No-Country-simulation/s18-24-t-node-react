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
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PropertyService } from './property.service';
import { Property } from './entities/property.entity';
import { ImageService } from './image.service';
import { CreatePropertyDto, UpdatePropertyDto } from './dto';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { PropertyParamsDto } from './dto/property-params.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('property')
@Controller('property')
export class PropertyController {
  constructor(
    private readonly imageService: ImageService,
    private readonly propertyService: PropertyService,
  ) {}

  @ApiOperation({ summary: 'Find all properties' })
  @ApiResponse({ status: 200, description: 'Returns all properties success' })
  @ApiResponse({ status: 404, description: 'No properties found' })
  @Get()
  async findAll(@Query() filterQuery: PropertyParamsDto) {
    return await this.propertyService.findAll(filterQuery);
  }

  @ApiOperation({ summary: 'Find a property by id' })
  @ApiResponse({ status: 200, description: 'Returns a property success' })
  @ApiResponse({ status: 404, description: 'No property found' })
  @Get(':id')
  async find(
    @Param('id', ObjectIdValidationPipe) propertyId: string,
  ): Promise<Property> {
    return this.propertyService.findOneById(propertyId);
  }

  @ApiOperation({ summary: 'Register a new property' })
  @ApiResponse({ status: 200, description: 'Register property success' })
  @ApiResponse({ status: 404, description: 'Property not created' })
  @Post('register')
  @UseInterceptors(FilesInterceptor('images'))
  @UseGuards(AuthGuard('jwt'))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPropertyDto: CreatePropertyDto,
  ): Promise<Property> {
    const imageUrls = await this.imageService.uploadImages(files);

    const propertyData = {
      ...createPropertyDto,
      photos: imageUrls,
    };

    console.log(propertyData);

    return this.propertyService.create(propertyData);
  }
  @ApiOperation({ summary: 'Get property by id' })
  @ApiResponse({ status: 200, description: 'Returns a property success' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @Get('get/:id')
  async findOneById(@Param('id') id: string) {
    return this.propertyService.findOneById(id);
  }
  @ApiOperation({ summary: 'Delete property by id' })
  @ApiResponse({ status: 200, description: 'Deleted property success' })
  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: number) {
    return this.propertyService.remove(id);
  }

  @ApiOperation({ summary: 'Patch property by id' })
  @ApiResponse({ status: 200, description: 'Patched property success' })
  @ApiResponse({ status: 404, description: 'Property not patched' })
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id', ObjectIdValidationPipe) propertyId: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    return this.propertyService.update(propertyId, updatePropertyDto);
  }
}
