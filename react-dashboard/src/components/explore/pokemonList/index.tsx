import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pokemon, PokemonDetails } from "@/pages/explorePage";
import { Dispatch, SetStateAction } from "react";
import Pagination from "@/components/pagination";
import { usePokemonList } from "./use";

interface PokemonListProps {
  setSelectedPokemon: Dispatch<SetStateAction<PokemonDetails | undefined>>;
  loading: boolean;
  pokemons: Pokemon[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

export default function PokemonList({
  setSelectedPokemon,
  loading,
  pokemons,
  page,
  setPage,
  totalPages,
}: PokemonListProps) {
  const { loadPokemonDetails } = usePokemonList({ setSelectedPokemon });

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Pokémon List</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {pokemons.map((pokemon) => (
                <Button
                  key={pokemon.name}
                  variant="outline"
                  className="h-auto py-3 text-white"
                  onClick={() => loadPokemonDetails(pokemon.url)}
                >
                  {pokemon.name}
                </Button>
              ))}
            </div>

            <Pagination
              loading={loading}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
