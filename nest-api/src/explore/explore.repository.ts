import { Injectable } from '@nestjs/common';
import { ExploreRepositoryInterface } from './explore.repository.interface';
import { SearchResultDTO } from 'src/common/dtos/search-result.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginatedResponse';
import { firstValueFrom } from 'rxjs';
import {
  ExploreResponse,
  PokemonListApiResponse,
} from 'src/common/interfaces/exploreResponse';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ExploreRepository implements ExploreRepositoryInterface {
  constructor(private readonly http: HttpService) {}

  async findAll(
    filters: SearchResultDTO,
  ): Promise<PaginatedResponse<ExploreResponse>> {
    const { page = 1, limit = 50 } = filters ?? {};
    const skip = (page - 1) * limit;

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${skip}&limit=${limit}`;

    const response = await firstValueFrom(
      this.http.get<PokemonListApiResponse>(url),
    );
    const { results, count } = response.data;

    const data: ExploreResponse[] = results.map((p) => ({
      name: p.name,
      url: p.url,
    }));

    return {
      data,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    };
  }

  async getByName(name: string): Promise<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;

    const response = await firstValueFrom(this.http.get(url));
    return response.data;
  }
}
