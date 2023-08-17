import {
 ReactNode
} from 'react'

type Props = {
 children: ReactNode
}

const ArtBoard = ({children}: Props) => {
 return (
   <div className="artboard phone-2 mx-auto">
    {
     children
    }
   </div>
  )
}

export default ArtBoard