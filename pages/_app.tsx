import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { useState } from 'react'
import Router from 'next/router'
import LoadingPage from '../components/LoadingPage'

function MyApp({ Component, pageProps }: AppProps) : JSX.Element {
  const [loading, setLoading] = useState(false)
  
  Router.events.on('routeChangeStart',url=>{
    if(!url.includes("?")) setLoading(true)
  })
  Router.events.on('routeChangeComplete',url=>{
    if(!url.includes("?")) setTimeout(()=>{
      setLoading(false)
    },500)
  })
  return(
    <Provider store={store}>
      {
        loading?(
          <LoadingPage/>
        ):(
          <Component {...pageProps} />
        )
      }
    </Provider>
  )
  
}

export default MyApp
