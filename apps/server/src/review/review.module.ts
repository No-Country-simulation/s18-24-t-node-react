import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewService } from './review.service';
import { Review, ReviewSchema } from './entities/review.entity';
import { ReviewController } from './review.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  ],
  controllers: [ReviewController], 
  providers: [ReviewService],
  exports: [ReviewService], 
})
export class ReviewModule {}
