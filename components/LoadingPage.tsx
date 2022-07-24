import React from 'react'
import Lottie from "lottie-react"
import animation from "../public/loading.json"

const LoadingPage = () => {
  return (
    <article className='w-full bg-white h-full flex justify-center items-center'>
        <div className=''>
          <Lottie
            animationData={animation} 
            style={{width : 200, height:200,}}  
          />
        </div>
    </article>
  )
}

export default LoadingPage