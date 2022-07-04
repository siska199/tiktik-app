import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useEffect, useState} from "react"

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true)
  useEffect(()=>{
    setIsSSR(false)
  },[isSSR])

  if(isSSR) return null
  return <Component {...pageProps} />
}

export default MyApp
