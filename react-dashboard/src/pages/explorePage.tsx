import { useEffect, useState } from "react";
import axios from "axios";
import PokemonList from "@/components/explore/pokemonList";
import PokemonDetailsComponent from "@/components/explore/pokemonDetails";

export interface Pokemon {
  name: string;
  url: string;
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

export default function ExplorePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<
    PokemonDetails | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPokemons, setTotalPokemons] = useState(1);

  const limit = 20;

  useEffect(() => {
    loadPokemons();
  }, [page]);

  const loadPokemons = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
          page * limit
        }`
      );
      setPokemons(response.data.results);
      setTotalPokemons(response.data.count);
    } catch (error) {
      console.error("Error loading pokemons:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Explore Pokémons</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PokemonList
            loading={loading}
            pokemons={pokemons}
            setSelectedPokemon={setSelectedPokemon}
            page={page}
            setPage={setPage}
            totalPages={Math.floor(totalPokemons / limit)}
          />

          <PokemonDetailsComponent selectedPokemon={selectedPokemon} />
        </div>
      </div>
    </div>
  );
}
