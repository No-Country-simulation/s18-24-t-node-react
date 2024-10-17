import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyService } from './property.service';
import { ImageService } from './image.service';
import { PropertyController } from './property.controller';
import { Property, PropertySchema } from './entities/property.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configureCloudinary } from '../cloudinaryConfig';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
    ]),
  ],
  controllers: [PropertyController],
  providers: [
    PropertyService, 
    ImageService,
    {
      provide: 'CLOUDINARY', // Proporciona el cliente de Cloudinary
      useFactory: (configService: ConfigService) => {
        return configureCloudinary(configService); // Llama a la función de configuración
      },
      inject: [ConfigService], // Inyecta ConfigService para acceder a las variables de entorno
    },
  ],
  exports: [PropertyService], // Exporta PropertyService para usarlo en otros módulos
})
export class PropertyModule {}

