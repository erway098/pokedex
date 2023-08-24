import { 
 useEffect, 
 useCallback
} from "react";

import { 
 IconContext
} from "react-icons";
import { 
 FaArrowLeft 
} from "react-icons/fa";

import { 
 useRouter
} from "next/router";

import { 
 useAppContext 
} from "@/contexts/store";

import { 
 useFetcher 
} from "@/hooks/useFetch";

import {
 initialTabs
} from '@/interfaces/tabs'

import Head from "next/head";
import Link from "next/link";

import LoadingPage from "@/components/loading/loadingPage";
import Tabs from '@/components/tabs'

const PokemonDetail = () => {
  const router = useRouter();

  const { id } = router.query;
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    dispatch({
      type: "IS_LOADING",
      payload: true,
    });
    (async () => {
    const pokemon = await useFetcher(`https://pokeapi.co/api/v2/pokemon/${id}`);
    dispatch({
      type: "POKEMON_DETAIL",
      payload: {
        cardColor: pokemon.types[0].type.name,
        pokemon,
      },
    });
    dispatch({
      type: "IS_LOADING",
      payload: false,
    })
    })()
  }, []);
  
  const handleBack = () => {
   dispatch({
    type: 'IS_LOADING',
    payload: true
   })
   dispatch({
    type: 'POKEMON_DETAIL',
    payload: {}
   })
   router.back()
  }
  
  const { cardColor, pokemon } = state.pokemonDetail;
  
  return (
    <>
      {state.isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Head>
            <title>pokedex | pokemon detail</title>
          </Head>
          <div className={`${cardColor}-detail w-full h-full min-h-screen`}>
            <div className="bg-[url('/pokeball.svg')] bg-no-repeat bg-cover bg-center h-2/5 px-4 bg-transparent">
              <div className="w-full py-4">
               <button 
                onClick={handleBack}
                className="text-white">
                <IconContext.Provider
                 value={{
                  size: "26px",
                 }}>
                 <FaArrowLeft />
                </IconContext.Provider>
               </button>
              </div>
              <div>
                <div className="h-52 flex flex-col justify-end items-center relative">
                  <div className="h-52 absolute bottom-14">
                    <img
                      src={pokemon?.sprites.other.home.front_default}
                      alt={pokemon?.name}
                      loading="lazy"
                      className="h-full"
                    />
                  </div>
                  <div className="text-white text-2xl font-bold text-center">
                    <p>#{pokemon?.id}</p>
                    <p className="text-lg">
                    {pokemon?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-3/5 bg-white rounded-t-[2.5rem] pt-6 px-4">
             <Tabs tabs={initialTabs} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PokemonDetail;
