import { v2 as cloudinary } from 'cloudinary'; // Se importa la versión 2 del SDK de Cloudinary
import { ConfigService } from '@nestjs/config';

export const configureCloudinary = (configService: ConfigService) => {
  const cloudName = configService.get<string>('CLOUDINARY_CLOUD_NAME');
  const apiKey = configService.get<string>('CLOUDINARY_API_KEY');
  const apiSecret = configService.get<string>('CLOUDINARY_API_SECRET');

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary configuration variables are missing');
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  return cloudinary;
};

export default cloudinary;