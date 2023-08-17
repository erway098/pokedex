export interface IPokemon {
 id: number;
 name: string;
 image: string;
 cardColor: string;
 types: [{
  type: {
   name: string;
  }
 }]
}

export const initialPokemon: IPokemon[] = [{
 id: 0,
 name: '',
 image: '',
 cardColor: '',
 types: [{
  type: {
   name: ''
  }
 }]
}]