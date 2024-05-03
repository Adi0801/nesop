"use client"

import React, { useState } from 'react';
import { PokemonType } from '@/app/types/PokemonType';
import { trpc } from '@/app/_trpc/client';
import { PokemonRow } from '@/app/Components/PokemonRow';

import { Typography, TextField, Button } from '@mui/material';


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
   
  };

  return (
    <div className="max-w-md mx-auto">
      <Typography variant="h3" component="h1" className="text-3xl font-bold mb-4">Search Pokemon</Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name:</label>
          <TextField
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="Enter Pokemon Name"
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Search Pokemon
        </Button>
      </form>
      {getPokemon.data && <PokemonRow key={getPokemon.data.id} pokemon={getPokemon.data} />}
    </div>
  );
}

export default SingleView;
