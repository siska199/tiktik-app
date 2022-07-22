import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react"
import { Provider } from 'react-redux'
import store from '../redux/store'

import { useState } from 'react'
import Router from 'next/router'
import ProgressBar from '../components/ProgressBar'


function MyApp({ Component, pageProps : {session, ...pageProps} }: AppProps) : JSX.Element {
  const [loading, setLoading] = useState(false)
  
  Router.events.on('routeChangeStart',url=>{
    if(!url.includes("?")) setLoading(true)
  })
  Router.events.on('routeChangeComplete',url=>{
    if(!url.includes("?")) setLoading(false)
  })
  return(
    <SessionProvider session={session}>
      <Provider store={store}>
        <ProgressBar isAnimating={loading}/>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
  
}

export default MyApp
