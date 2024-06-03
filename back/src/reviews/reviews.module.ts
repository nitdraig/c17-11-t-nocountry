import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schemas/review.schema';
import { MongooseService } from '@Helpers/mongoose/mongoose.service';
import { GettersController } from './v1/getters/getters.controller';
import { AddController } from './v1/add/add.controller';
import { CaretakerModule } from '@Caretaker/caretaker.module';
import { UpdateController } from './v1/update/update.controller';
import { DeleteController } from './v1/delete/delete.controller';

@Module({
  providers: [ReviewsService, MongooseService],
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    CaretakerModule,
  ],
  controllers: [GettersController, AddController, UpdateController, DeleteController],
})
export class ReviewsModule {}
