import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import {
 AppProvider
} from '@/contexts/store'

import ArtBoard from '@/components/artboard'

export default function App({ Component, pageProps }: AppProps) {
  return (
   <ArtBoard>
    <AppProvider>
     <Component {...pageProps} />
    </AppProvider>
   </ArtBoard>
  )
}
