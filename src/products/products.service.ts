import { Injectable, NotFoundException } from '@nestjs/common';
import PaginationDto from 'src/common/dto/pagination.dto';
import { CreateProductOptions, ProductCriteria, SelectFields } from 'src/common/types';
import ProductsResponseDto from './dto/responses/products-response.dto';
import ProductsRepository from './products.repository';
import { Product } from './schemas/products.schema';

@Injectable()
export default class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
  ) {}

  public async create(createProductOptions: CreateProductOptions): Promise<Product> {
    return this.productsRepository.create(createProductOptions);
  }

  public async get(productCriteria: ProductCriteria): Promise<Product[] | undefined> {
    return this.productsRepository.get(productCriteria);
  }

  public async getOneOrError(productCriteria: ProductCriteria, select?: SelectFields<Product>): Promise<Product> {
    const user = await this.productsRepository.getOne(productCriteria, select);

    if (!user) {
      throw new NotFoundException('Product not found');
    }

    return user;
  }

  public async getOne(productCriteria: ProductCriteria): Promise<Product | undefined> {
    return this.productsRepository.getOne(productCriteria);
  }

  public async getWithPagination(
    productCriteria: ProductCriteria,
    { page, limit }: PaginationDto,
  ): Promise<ProductsResponseDto> {
    const [paginatedResult, totalCount] = await this.productsRepository.getWithPagination(
      productCriteria, { page, limit },
    );

    return {
      paginatedResult,
      totalCount,
    };
  }
}
