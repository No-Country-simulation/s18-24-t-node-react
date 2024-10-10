/*
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

*/
// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import * as dotenv from 'dotenv';

dotenv.config();
const mongoUri = process.env.MONGO_URI;
@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    UserModule,
  ],
})
export class AppModule {}
