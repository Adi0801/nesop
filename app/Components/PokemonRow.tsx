import { PokemonType } from "../types/PokemonType";

export function PokemonRow({ pokemon }: { pokemon: PokemonType }) {
    return (
      <div className="flex items-center border-b py-2">
        <div className="w-16">{pokemon.id}</div>
        <div className="w-32">{pokemon.name}</div>
        <div className="w-32">{pokemon.types.join(', ')}</div>
        <div className="w-32">
          <img src={pokemon.sprite} alt={pokemon.name} className="w-12 h-12" />
        </div>
      </div>
    );
  }
