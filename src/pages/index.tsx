import { useEffect, useState, FC, ChangeEvent } from "react";

import { useAppContext } from "@/contexts/store";

import { IconContext } from "react-icons";
import { BsSearch, BsFilter } from "react-icons/bs";

import {
 useFetcher
} from '@/hooks/useFetch'

import {
 IPokemon
} from '@/interfaces/pokemon'

import Head from "next/head";
import Link from "next/link";

import PokemonCard from "@/components/card/pokemonCard";
import CardSceleton from "@/components/loading/cardSceleton";
import Modal from '@/components/modal'

const HomePage = () => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);
 
  const getPokemon = async (url: string) => {
   const response = await useFetcher(url)
   
   const pokeData: IPokemon[] = []
   
   for (let data of response.results) {
    const res = await useFetcher(data.url)
    pokeData.push({
     id: res.id,
     name: res.name,
     image: res.sprites.other.home.front_default,
     cardColor: res.types[0].type.name,
     types: res.types
    })
   }
      
   const pokemon: {
    next: string,
    data: IPokemon[]
   } = {
    next: response.next,
    data: pokeData
   }
   
   return pokemon
  }
 
  useEffect(() => {
   (async () => {
    const pokemon = await getPokemon('https://pokeapi.co/api/v2/pokemon') 
    dispatch({
     type: 'GET_POKEMON',
     payload: pokemon
    })
    dispatch({
     type: 'IS_LOADING',
     payload: false
    })
   })()
  },[]);

  const handleLoadMore = async (url: string) => {
    setLoading(true);
    const pokemon = await getPokemon(url);
    dispatch({
      type: "LOAD_MORE",
      next: pokemon.next,
      payload: pokemon.data,
    });
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>pokedex | home</title>
      </Head>
      <main>
        <div className="px-2 pb-5">
          <Header />
          <div className="mt-4">
            <button
              type="button"
              onClick={
               ()=>window.my_modal_3.showModal()
              }
              className="btn btn-block rounded-lg bg-gray-500"
            >
              <IconContext.Provider
                value={{
                  size: "24px",
                  className: "text-gray-900",
                }}
              >
                <BsFilter />
              </IconContext.Provider>
            </button>
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-12 gap-2">
              {state.isLoading
                ? [1, 2, 3, 4, 5, 6].map((val) => {
                    return (
                      <div key={val} className="col-span-6">
                        <CardSceleton />
                      </div>
                    );
                  })
                : state.pokemon.data.map((pokemon) => {
                    return (
                      <div key={pokemon.id} className="col-span-6">
                        <PokemonCard
                          id={pokemon.id}
                          name={pokemon.name}
                          image={pokemon.image}
                          cardColor={pokemon.cardColor}
                          types={pokemon.types}
                        />
                      </div>
                    );
                  })}
              <div className={`col-span-12 my-6`}>
                <center>
                  <button
                    onClick={() => handleLoadMore(state.pokemon.next)}
                    disabled={loading}
                    className={`btn btn-sm ${
                      loading ? "btn-neutral" : "btn-secondary"
                    } text-sm font-normal`}
                    type="button"
                  >
                    {loading ? (
                      <div className="flex items-center gap-x-2 text-white text-sm">
                        <span className="loading loading-spinner text-secondary"></span>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      "Load More."
                    )}
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
        <Modal />
      </main>
    </>
  );
};

const Header = () => {
  return (
    <div className="mt-12">
      <center>
        <Link href="https://pokeapi.co/" className="mb-2">
          <img
            src="https://pokeapi.co/static/pokeapi_256.3fa72200.png"
            alt="pokeapi logo"
            loading="lazy"
          />
        </Link>
      </center>
      <p className="text-gray-500 text-center text-lg font-normal">
        filter pokemonon by generation pokemon!.
      </p>
    </div>
  );
};



export default HomePage;
