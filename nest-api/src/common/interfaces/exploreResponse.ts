export interface ExploreResponse {
  name: string;
  url: string;
}

export interface PokemonListApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ExploreResponse[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}
