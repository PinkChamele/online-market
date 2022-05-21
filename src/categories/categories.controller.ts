import {
  Body, Controller, Get, Post, Query, UseGuards,
} from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiUnauthorizedResponse, ApiBody,
} from '@nestjs/swagger';
import ApiSchema from 'src/common/decorators/typical-response.decorator';
import PaginationDto from 'src/common/dto/pagination.dto';
import JwtAccessGuard from 'src/common/guards/jwt-access.guard';
import CategoriesService from './categories.service';
import CreateCategoryDto from './dto/create-category.dto';
import CategoriesResponseDto from './dto/responses/categories-response.dto';
import CategoryResponseDto from './dto/responses/category-response.dto';

@ApiTags('Categories')
@ApiBearerAuth()
@ApiExtraModels(CategoryResponseDto, CategoriesResponseDto)
@Controller({
  path: 'categories',
  version: '1',
})
export default class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOkResponse({ schema: ApiSchema(CategoryResponseDto) })
  @ApiUnauthorizedResponse({ description: '401. Unauthorized' })
  @ApiBody({ type: CreateCategoryDto })
  @UseGuards(JwtAccessGuard)
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOkResponse({ schema: ApiSchema(CategoriesResponseDto) })
  @ApiUnauthorizedResponse({ description: '401. Unauthorized' })
  @UseGuards(JwtAccessGuard)
  @Get()
  async get(@Query() paginationParams: PaginationDto): Promise<CategoriesResponseDto> {
    return this.categoriesService.getWithPagination({}, paginationParams);
  }
}
