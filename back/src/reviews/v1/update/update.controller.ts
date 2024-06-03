import { CaretakerService } from '@Caretaker/caretaker.service';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { UpdateReviewDTO } from '@Reviews/dto/review.dto';
import { ReviewsService } from '@Reviews/reviews.service';
import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.REVIEW,
})
export class UpdateController {
  constructor(
    private reviewsService: ReviewsService,
    private caretakerService: CaretakerService,
  ) {}

  @Roles('owner')
  @Patch(':id')
  async update(
    @Body() data: UpdateReviewDTO,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    const { stars, description } = data;
    try {
      const foundReview = await this.reviewsService.findOneById(id);
      if (foundReview == null) throw new Error('null');

      const reviewCaretakerClient =
        await this.reviewsService.findByCaretakerAndClient(
          foundReview.caretaker['_id'],
          req.user['userId'],
        );
      if (reviewCaretakerClient.length == 0) {
        throw new Error('not_found_review');
      }

      if (stars) {
        const foundCaretaker = await this.caretakerService.findById(
          foundReview.caretaker['_id'],
        );

        const review = await this.reviewsService.update(id, {
          stars,
          description,
          updateAt: new Date(),
        });
        const sumPoint = foundCaretaker.sumPoint - foundReview.stars + stars;
        const avgStars = sumPoint / foundCaretaker.reviews;

        await this.caretakerService.update(foundCaretaker.user['_id'], {
          sumPoint: Number(sumPoint.toFixed(2)),
          stars: Number(avgStars.toFixed(2)),
        });

        return {
          success: true,
          data: review,
        };
      }

      const review = await this.reviewsService.update(id, {
        description,
        updateAt: new Date(),
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
            message: 'Review not found',
          });
        }
        if (error.message == 'not_found_review') {
          throw new BadRequestException({
            success: false,
            message: 'You cannot modify this review',
          });
        }
      }

      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }
}
