
import {router, procedure} from "./trpc"
import {PokemonRouter} from "./routers/pokemon"

export const appRouter = router({
    getPoke:PokemonRouter,
    getUser:procedure.query(() => {
        const user = {
            "name":"Piyush",
            "age":23
        }
        return user;
    })
});

export type AppRouter = typeof appRouter;
