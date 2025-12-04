import { SearchResultDTO } from 'src/common/dtos/search-result.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginatedResponse';
import { ExploreResponse } from 'src/common/interfaces/exploreResponse';

export interface ExploreRepositoryInterface {
  findAll(
    filters?: SearchResultDTO,
  ): Promise<PaginatedResponse<ExploreResponse>>;
  getByName(name: string): Promise<ExploreResponse>;
}
