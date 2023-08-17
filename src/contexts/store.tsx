import {
 useContext, 
 createContext,
 useReducer,
 ReactNode,
 FC,
 Dispatch
} from 'react'

import {
 createReducer,
 State,
 Action,
 initialState
} from './reducer'

const AppContext = createContext<{
 state: State,
 dispatch: Dispatch<Action>
}>({
 state: initialState,
 dispatch: () => {}
})

export const useAppContext = () => useContext(AppContext)

export const AppProvider: FC<{
 children: ReactNode
}> = ({children}) => {
 const [
  state, dispatch
  ] = useReducer(createReducer, initialState)
 return (
   <AppContext.Provider value={{
    state, dispatch
   }}>
   {
    children
   }
   </AppContext.Provider>
  )
}
