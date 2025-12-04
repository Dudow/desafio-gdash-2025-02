import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ExploreService } from './explore.service';
import { AuthGuard } from 'src/auth/guards/jwt-authorization.guard';

@Controller('explore')
@UseGuards(AuthGuard)
export class ExploreController {
  constructor(private readonly exploreService: ExploreService) {}

  @Get()
  findAll() {
    return this.exploreService.findAll();
  }

  @Get(':name')
  getPokemon(@Param('name') name: string) {
    return this.exploreService.findByName(name);
  }
}
