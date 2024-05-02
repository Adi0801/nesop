import { Pokemon } from "../types/Pokemon";

export function PokemonRow({ pokemon }: { pokemon: Pokemon }) {
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
