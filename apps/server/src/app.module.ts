import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb+srv://mongoUser:XD2YIwt4fAzyS2BX@cluster0.sfgmb53.mongodb.net/BD_Prueba'),
    UsersModule,
    PropertyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
