import {procedure, router} from "../trpc"
import {z} from "zod";
import { PrismaClient } from "@prisma/client";
import { Spirax } from "next/font/google";

const prisma = new PrismaClient();

const GetPokemonByNameInput = z.object({
    name: z.string(),
  });

export const PokemonRouter = router({
    getAllPokemon: procedure.query(async () => {
        return await prisma.Pokemon.findMany();
    }),
    getPokemon:procedure.input(z.object({name:z.string()}))
    .query(async (opts) => {
        const {input} = opts;
        const pokemon = await prisma.Pokemon.findFirst({
            where:{
                name:input.name
            }
        })
        return pokemon;

    }),
    getMultiplePokemons:procedure.input(z.object({names:z.array(z.string())}))
    .query(async (opts) => {
        const {input} = opts;
        const pokemons = await prisma.Pokemon.findMany({
            where:{
                name:{
                    in:input.names
                }
            }
        })
        return pokemons;

    }),
    addPokemon:procedure.input(z.object({name:z.string(),types:z.array(z.string()),sprite:z.string()}))
    .mutation(async (opts) => {
        const {input} = opts;
        await prisma.Pokemon.create({
            data:{
                name:input.name,
                types:input.types,
                sprite:input.sprite
            }
        })
    })
})
export type AppRouter = typeof PokemonRouter;
