import { useEffect, useState, FC, ChangeEvent } from "react";

import { useAppContext } from "@/contexts/store";

import { IconContext } from "react-icons";
import { BsSearch, BsFilter } from "react-icons/bs";

import { getPokemon } from "@/utils/getPokemon";

import Head from "next/head";
import Link from "next/link";

import PokemonCard from "@/components/card/pokemonCard";
import CardSceleton from "@/components/loading/cardSceleton";
import BottomNav from "@/components/navigation/bottomNav";

const HomePage = () => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPokemonData = async () => {
      const pokemon = await getPokemon('https://pokeapi.co/api/v2/pokemon')

      dispatch({
        type: 'GET_POKEMON',
        payload: pokemon
      })
      dispatch({
        type: 'IS_LOADING',
        payload: false
      })
    }
    getPokemonData()
  },[]);

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
  };

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
        <div className="px-4 pb-14">
          <Header />
          <div className="mt-4 flex justify-between items-center">
            <InputSearch
              onchange={(evt: ChangeEvent<HTMLInputElement>) =>
                handleSearch(evt)
              }
            />
            <button
              type="button"
              onClick={() => alert("filter")}
              className="btn rounded-lg bg-gray-500"
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
              <div className="col-span-12 my-6">
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
        <BottomNav />
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
        Use the advanced search to find pokemon by type, weakness, ability, and
        more!.
      </p>
    </div>
  );
};

const InputSearch: FC<{
  onchange: (evt: ChangeEvent<HTMLInputElement>) => void;
}> = ({ onchange }) => {
  return (
    <div className="relative">
      <input
        onChange={onchange}
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs pl-9 bg-transparent transition duration-500 ease-in focus:text-gray-300 focus:input-info"
      />
      <IconContext.Provider
        value={{
          className: "text-gray-500 absolute top-1/2 -translate-y-1/2 left-2",
          size: "24px",
        }}
      >
        <BsSearch />
      </IconContext.Provider>
    </div>
  );
};

export default HomePage;
