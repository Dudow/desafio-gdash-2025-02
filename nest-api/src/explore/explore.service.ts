import { Inject, Injectable } from '@nestjs/common';
import { SearchResultDTO } from 'src/common/dtos/search-result.dto';
import { ExploreRepositoryInterface } from './explore.repository.interface';

@Injectable()
export class ExploreService {
  constructor(
    @Inject('ExploreRepository')
    private readonly exploreRepository: ExploreRepositoryInterface,
  ) {}

  async findAll(filters?: SearchResultDTO) {
    const data = await this.exploreRepository.findAll(filters);

    return data;
  }

  async findByName(name: string) {
    return this.exploreRepository.getByName(name);
  }
}
