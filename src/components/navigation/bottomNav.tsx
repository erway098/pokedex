import {
 useAppContext
} from '@/contexts/store'

import {
 IconContext
} from 'react-icons'

import {
 BottomNavigation
} from '@/interfaces/navigation/bottomNav'

import Link from 'next/link'

const BottomNav =  () => {
 const {
  state, dispatch
 } = useAppContext()
  
 const handleActive = (index: number) => {
  dispatch({
   type: 'BOTTOM_LINK',
   payload: index
  })
 }
 
 return (
   <div className="fixed bottom-0 left-0 w-full px-4 bg-gray-900 flex items-center justify-between h-16">
    {
     BottomNavigation.map(value => {
      return (
       <Link 
        key={value.id}
        onClick={() => handleActive(value.id)}
        href={value.to}
        className="flex flex-col items-center">
        <span className={`p-3 rounded-full ${state.bottomLink === value.id ? 'active-bottom-link' : 'translate-y-2'} transition duration-500 ease-in`}>
         <IconContext.Provider value={{
          size: 24,
          className: 'text-white'
         }}>
          <value.icon />
         </IconContext.Provider>
        </span>
        <span className={`text-white text-sm font-normal ${state.bottomLink === value.id ? 'opacity-1 -translate-y-2' : 'opacity-0 translate-y-4'} transition duration-500 ease-in`}>
         {value.name}
        </span>
       </Link>
       )
     })
    }
   </div>
  )
}

export default BottomNav