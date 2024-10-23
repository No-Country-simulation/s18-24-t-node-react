import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './entities/review.entity';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async create(createReviewDto: CreateReviewDto) {
    const { property, guest, rating, comment } =
    createReviewDto;

    const newReview = new this.reviewModel({
      property,  
      guest,
      rating,
      comment,
    });

    return newReview.save();
  }

  async findAll() {
    return this.reviewModel.find().exec();
  }

  async findOne(id: number) {
    return this.reviewModel.findById(id).exec();
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .exec();
  }

  async remove(id: number) {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }
}
