import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';

dotenv.config();
const mongoUri = process.env.MONGO_URI;
@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    UsersModule,
  ],
})
export class AppModule {}






