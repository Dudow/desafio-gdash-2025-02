import { PokemonDetails } from "@/pages/explorePage";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

interface usePokemonListProps {
  setSelectedPokemon: Dispatch<SetStateAction<PokemonDetails | undefined>>;
}

export const usePokemonList = ({ setSelectedPokemon }: usePokemonListProps) => {
  const loadPokemonDetails = async (url: string) => {
    try {
      const response = await axios.get<PokemonDetails>(url);
      setSelectedPokemon(response.data);
    } catch (error) {
      console.error("Error loading pokemon data:", error);
    }
  };

  return {
    loadPokemonDetails,
  };
};
