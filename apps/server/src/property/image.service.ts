import { Injectable } from '@nestjs/common';
import cloudinary from '../cloudinaryConfig';

@Injectable()
export class ImageService {
  async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    const uploadPromises = files.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
              if (error) {
                return reject(new Error('Error uploading image to Cloudinary'));
              }
              resolve(result.secure_url); // Devuelve la URL segura de la imagen
            },
          );
          uploadStream.end(file.buffer); // Envía el archivo a Cloudinary
        }),
    );

    return Promise.all(uploadPromises); // Espera a que todas las imágenes se suban
  }
}
