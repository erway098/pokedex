/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";

import { useRouter } from "next/router";

import { IconContext } from "react-icons";
import { FaArrowLeft } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

import { useAppContext } from "@/contexts/store";

import { useFetcher } from "@/hooks/useFetch";

import Head from "next/head";
import Link from "next/link";

import LoadingPage from "@/components/loading/loadingPage";

const PokemonDetail = () => {
  const router = useRouter();

  const { id } = router.query;
  const { state, dispatch } = useAppContext();

  const getPokemonData = async (url: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const pokemon = await useFetcher(url);

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
    });
  };

  useEffect(() => {
    dispatch({
      type: "IS_LOADING",
      payload: true,
    });
    getPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }, []);

  console.log(state.pokemonDetail);
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
            <div className="bg-[url('/pokeball.svg')] bg-no-repeat bg-contain bg-center h-2/5 px-4 bg-transparent">
              <TopBar />
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
                    <p>{pokemon?.name}</p>
                    <p className="text-lg">#{pokemon?.id}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-3/5 bg-white rounded-t-[2.5rem]"></div>
          </div>
        </>
      )}
    </>
  );
};

const TopBar = () => {
  return (
    <div className="w-full py-4 flex justify-between items-center">
      <Link href="/" className="text-white">
        <IconContext.Provider
          value={{
            size: "26px",
          }}
        >
          <FaArrowLeft />
        </IconContext.Provider>
      </Link>
      <button type="button" className="text-white">
        <IconContext.Provider
          value={{
            size: "26px",
          }}
        >
          <AiFillHeart />
        </IconContext.Provider>
      </button>
    </div>
  );
};

export default PokemonDetail;
