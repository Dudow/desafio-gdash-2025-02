import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ExploreService } from './explore.service';
import { AuthGuard } from 'src/auth/guards/jwt-authorization.guard';
import { SearchResultDTO } from 'src/common/dtos/search-result.dto';

@Controller('explore')
@UseGuards(AuthGuard)
export class ExploreController {
  constructor(private readonly exploreService: ExploreService) {}

  @Get()
  findAll(@Query() filters?: SearchResultDTO) {
    return this.exploreService.findAll(filters);
  }

  @Get(':name')
  getPokemon(@Param('name') name: string) {
    return this.exploreService.findByName(name);
  }
}
