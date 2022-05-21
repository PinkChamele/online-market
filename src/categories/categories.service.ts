import { Injectable, NotFoundException } from '@nestjs/common';
import PaginationDto from 'src/common/dto/pagination.dto';
import { CategoryCriteria, CreateCategoryOptions } from 'src/common/types';
import CategoriesRepository from './categories.repository';
import CategoriesResponseDto from './dto/responses/categories-response.dto';
import { Category } from './schemas/categories.schema';

@Injectable()
export default class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  public async create(createCategoryOptions: CreateCategoryOptions): Promise<Category> {
    return this.categoriesRepository.create(createCategoryOptions);
  }

  public async get(categoryCriteria: CategoryCriteria): Promise<Category[] | undefined> {
    return this.categoriesRepository.get(categoryCriteria);
  }

  public async getOneOrError(categoryCriteria: CategoryCriteria): Promise<Category> {
    const user = await this.categoriesRepository.getOne(categoryCriteria);

    if (!user) {
      throw new NotFoundException('Category not found');
    }

    return user;
  }

  public async getOne(categoryCriteria: CategoryCriteria): Promise<Category | undefined> {
    return this.categoriesRepository.getOne(categoryCriteria);
  }

  public async getWithPagination(
    categoryCriteria: CategoryCriteria,
    { page, limit }: PaginationDto,
  ): Promise<CategoriesResponseDto> {
    const [paginatedResult, totalCount] = await this.categoriesRepository.getWithPagination(
      categoryCriteria, { page, limit },
    );

    return {
      paginatedResult,
      totalCount,
    };
  }
}
