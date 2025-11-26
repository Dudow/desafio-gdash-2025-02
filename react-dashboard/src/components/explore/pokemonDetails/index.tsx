import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PokemonDetails } from "@/pages/explorePage";

interface PokemonDetailsProps {
  selectedPokemon?: PokemonDetails;
}

export default function PokemonDetailsComponent({
  selectedPokemon,
}: PokemonDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedPokemon ? (
          <div className="space-y-4">
            <img
              src={
                selectedPokemon.sprites.front_default ||
                "https://i.sstatic.net/xeqSS.jpg"
              }
              alt={selectedPokemon.name}
              className="w-full max-w-[200px] mx-auto"
            />
            <div>
              <h3 className="text-xl font-bold capitalize mb-2">
                {selectedPokemon.name}
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>ID:</strong> #{selectedPokemon.id}
                </p>
                <p>
                  <strong>Height:</strong> {selectedPokemon.height / 10} m
                </p>
                <p>
                  <strong>Weight:</strong> {selectedPokemon.weight / 10} kg
                </p>
                <div>
                  <strong>Types:</strong>
                  <div className="flex gap-2 mt-1">
                    {selectedPokemon.types.map((t) => (
                      <span
                        key={t.type.name}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {t.type.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            Select a Pokemon to see details
          </p>
        )}
      </CardContent>
    </Card>
  );
}
