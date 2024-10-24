import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),

    UsersModule,
    PropertyModule,
    ReservationsModule,
    AuthModule,
    PaymentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
