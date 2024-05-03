"use client"

import { useEffect, useState } from "react";
import { trpc } from "./_trpc/client";
import Link from "next/link";

import { Grid, TextField, Button } from '@mui/material';

import {PokemonType} from "./types/PokemonType"

import { PokemonRow } from "./Components/PokemonRow";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [types, setTypes] = useState<string[]>([]);
  const [sprite, setSprite] = useState<string>("");

  const[pokemons, setPokemons]  = useState<PokemonType[]>();

 
  const getPokemon = trpc.getPoke.getAllPokemon.useQuery();
  const addPoke = trpc.getPoke.addPokemon.useMutation({
    onSettled:() => {
      getPokemon.refetch();
    }
  });

  // const deletePokemon = trpc.getPoke.deletePokemon.useMutation();
  // deletePokemon.mutate();
 
  const fetchPokemons = async () => {
    const data = await getPokemon.data;
    setPokemons(data);
  };

  // Use useEffect to fetch Pokemon data after component mounts and whenever a new Pokemon is added
  // useEffect(() => {
  //   fetchPokemons();
  // }, []);

  //  console.log(getPoke.data);
   
  const handleSubmit = (e:any) => {
    e.preventDefault();
    addPoke.mutate({ name, types, sprite });
    setName("");
    setTypes([]);
    setSprite("");
    fetchPokemons();
  };

  return (
    <Grid container spacing={4} sx={{ padding: 8 }}>
      <Grid item xs={12} md={6}>
        {getPokemon.data && getPokemon.data.map(pokemon => (
          <PokemonRow key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid>

      <Grid item xs={12} md={6}>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <TextField
            type="text"
            label="Pokemon Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
          <TextField
            type="text"
            label="Enter types (comma separated)"
            value={types.join(', ')}
            onChange={(e) => {
              const newItems = e.target.value.split(',').map((item) => item.trim());
              setTypes(newItems);
            }}
            variant="outlined"
          />
          <TextField
            type="text"
            label="Enter Image Url"
            value={sprite}
            onChange={(e) => setSprite(e.target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Add Pokemon
          </Button>
        </form>
      </Grid>

      <Grid item sx={{ position: 'fixed', top: 0, right: 0, p: 4, md: { p: 8 } }} container spacing={2}>
        <Grid item>
          <Link href="/single">
            <Button variant="contained" color="primary">
              Go to Single View
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/multiple">
            <Button variant="contained" color="success">
              Go to Multi-View
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>

  
  
  );
}



