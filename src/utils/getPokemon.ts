import {
 IPokemon,
} from '@/interfaces/pokemon'

import {
 useFetcher
} from '@/hooks/useFetch'

export const getPokemon = async (url: string) => {
 
 const response = await useFetcher(url)

 const pokemonData: IPokemon[] = []
  
 for(let data of response.results){
  const res = await useFetcher(data.url)
  const result: IPokemon = {
   id: res.id,
   name: res.name,
   image: res.sprites.other.home.front_default,
   cardColor: res.types[0].type.name,
   types: res.types
  }
  pokemonData.push(result)
 }
 
 const pokemon : {
  next: string,
  data: IPokemon[]
 } = {
  next: response.next,
  data: pokemonData
 }
 
 return pokemon
}