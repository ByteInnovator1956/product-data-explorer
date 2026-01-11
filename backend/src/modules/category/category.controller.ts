import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':navigationId')
  findByNavigation(@Param('navigationId', ParseIntPipe) navigationId: number) {
    return this.categoryService.findByNavigation(navigationId);
  }
}
