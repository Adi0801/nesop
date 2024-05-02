"use client"

import React, { useState } from 'react';
import { PokemonType } from '@/app/types/PokemonType';
import { trpc } from '@/app/_trpc/client';
import { PokemonRow } from '@/app/Components/PokemonRow';

function MultipleView() {
  const [names, setNames] = useState<string[]>([]);
  const [pokemonData, setPokemonData] = useState<PokemonType[]>([]);
  const getPokemon = trpc.getPoke.getMultiplePokemons.useQuery({ names });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNames = e.target.value.split(',').map((name) => name.trim());
    setNames(inputNames);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted Names:', names);
    const data = await getPokemon.data;
    setPokemonData(data || []);
    setNames([]);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Search Pokemon</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="names" className="block mb-1">Names (comma separated):</label>
          <input
            type="text"
            id="names"
            name="names"
            value={names.join(', ')}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Enter Pokemon Names (comma separated)"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
        >
          Search Pokemon
        </button>
      </form>
      {pokemonData.length > 0 ? (
        pokemonData.map((pokemon) => (
          <PokemonRow  pokemon={pokemon} />
        ))
      ) : (
        <p className="text-red-500">No Pokemon found for the provided names.</p>
      )}
    </div>
  );
}

export default MultipleView;
