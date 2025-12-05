import { ExploreResponse, PokemonDetails } from "@/types/explore";
import api from "./api";
import { PaginatedResponse, PaginationParams } from "@/types/pagination";

export const exploreService = {
  async getAllPokemons(
    params: PaginationParams
  ): Promise<PaginatedResponse<ExploreResponse>> {
    const response = await api.get<PaginatedResponse<ExploreResponse>>(
      "/explore",
      {
        params,
      }
    );
    return response.data;
  },

  async getByName(name: string): Promise<PokemonDetails> {
    const response = await api.get<PokemonDetails>("/explore/" + name);
    return response.data;
  },
};
