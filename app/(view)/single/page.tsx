"use client"

import React, { useState } from 'react';
import { PokemonType } from '@/app/types/PokemonType';
import { trpc } from '@/app/_trpc/client';
import { PokemonRow } from '@/app/Components/PokemonRow';

function SingleView() {
  const [name, setName] = useState('');
  const [pokemonData, setPokemonData] = useState<PokemonType>();
  const getPokemon = trpc.getPoke.getPokemon.useQuery({ name });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted Name:', name);
    
    // const data = await getPokemon.data;
    // setPokemonData(data);
    setName('');
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Search Pokemon</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Enter Pokemon Name"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
        >
          Search Pokemon
        </button>
      </form>
      {getPokemon.data && <PokemonRow pokemon={getPokemon.data} />}
    </div>
  );
}

export default SingleView;
