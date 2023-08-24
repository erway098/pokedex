import {
 useCallback
} from 'react'

import {
 useFetcher
} from '@/hooks/useFetch'

import {
 IPokemon
} from '@/interfaces/pokemon'

import {
 useAppContext
} from '@/contexts/store'

const Modal = () => {
 const {
  state, dispatch
 } = useAppContext()
 
 const getPokemonGeneration = async (gen: number) => {

  dispatch({
   type: 'IS_LOADING',
   payload: true
  })
  
  const pokeGen = await useFetcher(`https://pokeapi.co/api/v2/generation/${gen}`)
  
  const setPokemonData: any [] = []
  pokeGen.pokemon_species.map(async (data) => {
   const response = await useFetcher(data.url)
   const res = await useFetcher(response.varieties[0].pokemon.url)
   setPokemonData.push({
     id: res.id,
     name: res.name,
     image: res.sprites.other.home.front_default,
     cardColor: res.types[0].type.name,
     types: res.types
   })
   const pokemon: {
    next: string,
    data: IPokemon[]
   } = {
    next: '',
    data: setPokemonData.sort((a,b) => a.id - b.id)
   }
 
   dispatch({
    type: 'GET_POKEMON',
    payload: pokemon
   })
   
   dispatch({
    type: 'IS_LOADING',
    payload: false
   })
  })
 }
 
 
 return (
 <dialog id="my_modal_3" className="modal">
   <form method="dialog" className="modal-box">
     <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
     <h3 className="font-bold text-lg">
      Pokemon Generation
     </h3>
     <div className="py-4">
      <button
       onClick={
        () => getPokemonGeneration(1)
       }
       className="btn btn-block btn-accent"
       type="button">Generation 1</button>
     </div>
     <div className="py-4">
      <button
       onClick={
        () => getPokemonGeneration(2)
       }
       className="btn btn-block btn-accent"
       type="button">Generation 2</button>
     </div>
     <div className="py-4">
      <button
       onClick={
        () => getPokemonGeneration(3)
       }
       className="btn btn-block btn-accent"
       type="button">Generation 3</button>
     </div>
   </form>
 </dialog>
 )
}

export default Modal