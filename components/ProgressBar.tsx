import { useNProgress } from '@tanem/react-nprogress'
import React, { useEffect, useState } from 'react'

interface ProgressBarProps{
    isAnimating : boolean;
}

const ProgressBar :React.FC<ProgressBarProps> = ({isAnimating}) => {
  const {animationDuration, isFinished, progress} = useNProgress({isAnimating, minimum:0.3})
  
  const lengthBar = 100-progress
  return (
    <section className={`${isFinished&&"hidden"} transition duration-${animationDuration}ms linear`}>
        <div className={`bar bg-main h-1 w-full -ml-[${lengthBar}%] left-0 top-0 fixed z-50 `}>
        </div>
    </section>
  )
}

export default ProgressBar