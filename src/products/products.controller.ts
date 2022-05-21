import { Types } from 'mongoose';

import {
  Body, Controller, Get, Param, Post, Query, UseGuards,
} from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiExtraModels, ApiBody, ApiOkResponse, ApiUnauthorizedResponse, ApiParam,
} from '@nestjs/swagger';
import ApiSchema from 'src/common/decorators/typical-response.decorator';
import PaginationDto from 'src/common/dto/pagination.dto';
import JwtAccessGuard from 'src/common/guards/jwt-access.guard';
import ParseObjectIdPipe from 'src/common/pipes/parse-object-id.pipe';
import CreateProductDto from './dto/create-product.dto';
import ProductResponseDto from './dto/responses/product-response.dto';
import ProductsResponseDto from './dto/responses/products-response.dto';
import ProductsService from './products.service';

@ApiTags('Products')
@ApiBearerAuth()
@ApiExtraModels(ProductResponseDto, ProductsResponseDto)
@Controller({
  path: 'products',
  version: '1',
})
export default class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOkResponse({ schema: ApiSchema(ProductResponseDto) })
  @ApiUnauthorizedResponse({ description: '401. Unauthorized' })
  @ApiParam({ name: 'categoryId', type: String })
  @ApiBody({ type: CreateProductDto })
  @UseGuards(JwtAccessGuard)
  @Post(':categoryId')
  async create(
    @Body() createProductDto: CreateProductDto,
    @Param('categoryId', ParseObjectIdPipe) categoryId: Types.ObjectId,
  ): Promise<ProductResponseDto> {
    return this.productsService.create({ ...createProductDto, category: categoryId });
  }

  @ApiOkResponse({ schema: ApiSchema(ProductsResponseDto) })
  @ApiUnauthorizedResponse({ description: '401. Unauthorized' })
  @UseGuards(JwtAccessGuard)
  @Get()
  async get(@Query() paginationParams: PaginationDto): Promise<ProductsResponseDto> {
    return this.productsService.getWithPagination({}, paginationParams);
  }
}
