
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
const mongoUri = process.env.MONGO_URI;
@Module({
  imports: [MongooseModule.forRoot(mongoUri),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}




