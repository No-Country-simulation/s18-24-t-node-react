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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://s1824tnodereact:BAkCcE7srIY1cNO5@cluster0.fgmuz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    UserModule,
  ],
})
export class AppModule {}
