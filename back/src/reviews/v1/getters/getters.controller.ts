import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Public } from '@Decorators/public-access.decorator';
import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ReviewsService } from '@Reviews/reviews.service';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.REVIEW,
})
export class GettersController {
  constructor(private reviewsService: ReviewsService) {}

  @Public()
  @Get()
  async getAll() {
    try {
      const reviews = await this.reviewsService.findAll();

      return {
        success: true,
        data: reviews,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }

  @Public()
  @Get('p')
  async getAllPaginate(@Query('page') p: string, @Query('limit') l: string) {
    const page = p == undefined ? 1 : Number(p);
    const limit = l == undefined ? 10 : Number(l);
    try {
      const reviews = await this.reviewsService.findAllPaginate(page, limit);

      return {
        success: false,
        data: reviews,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }

  @Public()
  @Get('caretaker/:id')
  async getAllByCaretaker(
    @Query('page') p: string,
    @Query('limit') l: string,
    @Param('id') id: string,
  ) {
    const page = p == undefined ? 1 : Number(p);
    const limit = l == undefined ? 10 : Number(l);

    try {
      const reviews = await this.reviewsService.findAllByCaretaker(
        id,
        page,
        limit,
      );

      return {
        success: true,
        data: reviews,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }

  @Get('user')
  async getAllByUser(
    @Query('page') p: string,
    @Query('limit') l: string,
    @Req() req: Request,
  ) {
    const page = p == undefined ? 1 : Number(p);
    const limit = l == undefined ? 10 : Number(l);
    try {
      const reviews = await this.reviewsService.findAllByClient(
        req.user['userId'],
        page,
        limit,
      );

      return {
        success: true,
        data: reviews,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }

  @Public()
  @Get(':id')
  async getOneById(@Param('id') id: string) {
    try {
      const review = await this.reviewsService.findOneById(id);
      if (review == null) {
        throw new Error('null');
      }

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
      }
      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }
}
