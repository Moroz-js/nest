import { Controller } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  // @Post()
  // create(@Body() dto: CreateReviewDto) {
  //   return this.reviewService.create(dto)
  // }
}
