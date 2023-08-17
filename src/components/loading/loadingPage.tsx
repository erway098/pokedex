import {
 IconContext
} from 'react-icons'
import {
 MdCatchingPokemon
} from 'react-icons/md'

const LoadingPage = () => {
 return (
   <div className="w-full h-screen flex justify-center items-center">
    <div className="p-3">
     <div className="animate-bounce">
      <IconContext.Provider value={{
       size: 85,
       className: 'text-gray-500'
      }}>
       <MdCatchingPokemon />
      </IconContext.Provider>
     </div>
     <p className="text-gray-500 text-xl font-medium">
      Loading...
     </p>
    </div>
   </div>
  )
}

export default LoadingPage