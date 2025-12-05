import { exploreService } from "@/services/explore";
import { PokemonDetails } from "@/types/explore";
import { Dispatch, SetStateAction } from "react";

interface usePokemonListProps {
  setSelectedPokemon: Dispatch<SetStateAction<PokemonDetails | undefined>>;
}

export const usePokemonList = ({ setSelectedPokemon }: usePokemonListProps) => {
  const loadPokemonDetails = async (name: string) => {
    try {
      const response = await exploreService.getByName(name);
      setSelectedPokemon(response);
    } catch (error) {
      console.error("Error loading pokemon data:", error);
    }
  };

  return {
    loadPokemonDetails,
  };
};
