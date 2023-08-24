import {
 useState
} from 'react'

import {
 ITabs
} from '@/interfaces/tabs'

import {
 useAppContext
} from '@/contexts/store'

import TabItem from './tabItem'

const Tabs = ({tabs}: ITabs) => {
 const [
  tab, setTab
  ] = useState(1)
  const {
   state
  } = useAppContext()
  
  const {
   pokemon
  } = state.pokemonDetail
  
  const handleTabs = (id: number) => {
   setTab(id)
  }
  
 return (
  <>
  <div id="tab_link" className="tabs flex-nowrap">
   {
    tabs.map(val => {
     return (
      <button
       type="button"
       key={val.id}
       id={val.tabId}
       onClick={() => handleTabs(val.id)}
       className={`tab tab-bordered w-full ${val.id === tab ? 'tab-active text-gray-900 font-medium' : 'text-gray-500'}`}>
       {val.name}
      </button>
     )
    })
   }
  </div>
  <div id="tab_link_content">
   <TabItem id={tab} tabId={1}>
    <div className="my-5">
     <div className="my-2 flex items-center gap-4 text-sm text-gray-500 font-normal">
      <p className="w-28">Species</p>
      <p>{pokemon?.species.name}</p>
     </div>
     <div className="my-2 flex items-center gap-4 text-sm text-gray-500 font-normal">
      <p className="w-28">Height</p>
      <p>{pokemon?.height}</p>
     </div>
     <div className="my-2 flex items-center gap-4 text-sm text-gray-500 font-normal">
      <p className="w-28">Weight</p>
      <p>{pokemon?.weight}</p>
     </div>
     <div className="my-2 flex items-center gap-4 text-sm text-gray-500 font-normal">
      <p className="w-28">Type</p>
      <p>{
       pokemon?.types.map((val,i) => {
        return (
         <span 
          key={i} 
          className="mr-2">
          {val.type.name}
         </span>
        )
       })
      }</p>
     </div>
     <div className="my-2 flex items-center gap-4 text-sm text-gray-500 font-normal">
      <p className="w-28">Ability</p>
      <p>{
       pokemon?.abilities.map((val,i) => {
        return (
         <span 
          key={i} 
          className="mr-2">
          {val.ability.name}
         </span>
        )
       })
      }</p>
     </div>
    </div>
   </TabItem>
   
   {/** tab stats */}
   <TabItem id={tab} tabId={2}>
    <div className="my-5">
     {
      pokemon?.stats.map((val,i) => {
       return (
        <div
         key={i}
         className="flex items-center gap-4 my-2 text-gray-500 text-sm font-normal">
         <p className="w-32">
         {val.stat.name}
         </p>
         <span className="font-medium text-center w-10">
         {val.base_stat}
         </span>
         <progress 
          className={`progress w-52 ${val.base_stat >= 75 ? 'progress-secondary' : 'progress-accent'}`}
          value={val.base_stat}
          max="150"></progress>
        </div>
       )
      })
     }
    </div>
   </TabItem>
  </div>
  </>
  )
}

export default Tabs