import {
 MdCatchingPokemon,
 MdCompareArrows
} from 'react-icons/md'
import {
 BiSolidMoviePlay
} from 'react-icons/bi'
import {
 AiFillHeart
} from 'react-icons/ai'

interface IBottomNav {
 id: number;
 name: string;
 icon: string;
 to: string;
}

export const BottomNavigation: IBottomNav[] = [
 {
  id: 1,
  name: 'Pokemon',
  icon: MdCatchingPokemon,
  to: '/'
 },
  {
  id: 2,
  name: 'Compare',
  icon: MdCompareArrows,
  to: '/compare'
 },
  {
  id: 3,
  name: 'Movies',
  icon: BiSolidMoviePlay,
  to: '/movie'
 },
  {
  id: 4,
  name: 'Favorites',
  icon: AiFillHeart,
  to: '/favorites'
 }
 ]