import {
 ReactNode
} from 'react'

type Props = {
 id: number;
 tabId: number;
 children: ReactNode;
}

const TabItem = ({id, tabId, children}: Props) => {
 return (
  <div 
   id={`tab_link_${tabId}_content`} 
   className={id === tabId ? '' : 'hidden'}>
   {
    children
   }
  </div>
 )
}

export default TabItem