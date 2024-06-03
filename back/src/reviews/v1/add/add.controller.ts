import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AddReviewDTO } from '@Reviews/dto/review.dto';
import { ReviewsService } from '@Reviews/reviews.service';
import { CaretakerService } from '@Caretaker/caretaker.service';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.REVIEW,
})
export class AddController {
  constructor(
    private reviewsService: ReviewsService,
    private caretakerService: CaretakerService,
  ) {}

  @Roles('owner')
  @Post()
  async add(@Body() data: AddReviewDTO, @Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { client, caretaker, ...body } = data;
    try {
      const foundCaretaker = await this.caretakerService.findById(caretaker);
      if (foundCaretaker == null) throw new Error('null');

      const foundReview = await this.reviewsService.findByCaretakerAndClient(
        caretaker,
        req.user['userId'],
      );
      if (foundReview.length != 0) throw new Error('found_review');

      const review = await this.reviewsService.add({
        client: req.user['userId'],
        caretaker,
        ...body,
      });

      const sumPoint = foundCaretaker.sumPoint + body.stars;
      const avgStars = sumPoint / (foundCaretaker.reviews + 1);

      await this.caretakerService.updateById(foundCaretaker._id.toString(), {
        sumPoint: Number(sumPoint.toFixed(2)),
        stars: Number(avgStars.toFixed(2)),
        reviews: foundCaretaker.reviews + 1,
      });

      return {
        success: true,
        data: review,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
          throw new NotFoundException({
            success: false,
            message: 'Caretaker not found',
          });
        }

        if (error.message == 'found_review') {
          throw new ConflictException({
            success: false,
            message: 'This caretaker already has a review',
          });
        }
      }
      throw new InternalServerErrorException({
        success: false,
        message: String(error.message),
      });
    }
  }
}
