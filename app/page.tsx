"use client"

import { useEffect, useState } from "react";
import { trpc } from "./_trpc/client";
import Link from "next/link";

import {PokemonType} from "./types/PokemonType"

import { PokemonRow } from "./Components/PokemonRow";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [types, setTypes] = useState<string[]>([]);
  const [sprite, setSprite] = useState<string>("");

  const[pokemons, setPokemons]  = useState<PokemonType[]>([]);

  const addPoke = trpc.getPoke.addPokemon.useMutation();
  const getPokemon = trpc.getPoke.getAllPokemon.useQuery();

  // const deletePokemon = trpc.getPoke.deletePokemon.useMutation();
  // deletePokemon.mutate();
 
  const fetchPokemons = async () => {
    setPokemons(getPokemon.data || []);
  };

  // Use useEffect to fetch Pokemon data after component mounts and whenever a new Pokemon is added
  useEffect(() => {
    fetchPokemons();
  }, []);

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
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
  {getPokemon.data && (
    <section className="col-span-full md:col-span-1 flex flex-col items-center">
      {getPokemon.data.map((pokemon: PokemonType) => (
        <PokemonRow key={pokemon.id} pokemon={pokemon} />
      ))}
    </section>
  )}

  <form onSubmit={handleSubmit} className="col-span-full md:col-span-1 flex flex-col space-y-4">
    <input
      type="text"
      name="pokemon"
      placeholder="Pokemon Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      placeholder="Enter types (comma separated)"
      type="text"
      value={types.join(', ')}
      onChange={(e) => {
        const newItems = e.target.value.split(',').map((item) => item.trim());
        setTypes(newItems);
      }}
      className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="text"
      name="sprite"
      placeholder="Enter Image Url"
      onChange={(e) => setSprite(e.target.value)}
      value={sprite}
      className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
    >
      Add Pokemon
    </button>
  </form>

  <div className="fixed top-0 right-0 p-4 md:p-8 flex space-x-4">
    <Link href="/single">
      <button className="btn bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700 focus:outline-none">
        Go to Single View
      </button>
    </Link>

    <Link href="/multiple">
      <button className="btn bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-700 focus:outline-none">
        Go to Multi-View
      </button>
    </Link>
  </div>
</main>

  
  
  );
}



