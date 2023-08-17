import { IPokemon, initialPokemon } from "@/interfaces/pokemon";

export type State = {
  pokemon: {
    next: string;
    data: IPokemon[];
  };
  pokemonDetail: any;
  isLoading: boolean;
};

export const initialState: State = {
  pokemon: {
    next: "",
    data: initialPokemon,
  },
  isLoading: true,
  pokemonDetail: {},
};

export type Action =
  | {
      type: "IS_LOADING";
      payload: boolean;
    }
  | {
      type: "GET_POKEMON";
      payload: {
        next: string;
        data: IPokemon[];
      };
    }
  | {
      type: "LOAD_MORE";
      next: string;
      payload: IPokemon[];
    }
  | {
      type: "POKEMON_DETAIL";
      payload: any;
    };

export const createReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "GET_POKEMON":
      return {
        ...state,
        pokemon: action.payload,
      };
    case "POKEMON_DETAIL":
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case "LOAD_MORE":
      return {
        ...state,
        pokemon: {
          next: action.next,
          data: [...state.pokemon.data, ...action.payload],
        },
      };
    default:
      return {
        state,
      };
  }
};
