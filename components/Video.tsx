import React, {useEffect, useRef, useState} from 'react'

interface Props {
  url : string;
}


const Video : React.FC<Props> = ({url}) => {
  const refVideo = useRef<HTMLVideoElement | null>(null)
  const [heightOffset, setHeightOffset] = useState()
  const [pause, setPause] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(false)

  useEffect(()=>{
    window.addEventListener('scroll',handleSroll)
    return ()=>{
      window.removeEventListener("scroll", handleSroll)
    }  
  },[heightOffset])

  const handleSroll = ()=>{
    const distanceElToTopScreen : number | undefined = refVideo.current?.getBoundingClientRect()?.top
    console.log(url)
    console.log(distanceElToTopScreen)
    if(distanceElToTopScreen) distanceElToTopScreen>0 && distanceElToTopScreen<300 ?  handlePausedUnpause(true) :  handlePausedUnpause(false)
    setHeightOffset((window as any).pageYOffset)
  }
  const handlePausedUnpause = (state : boolean) =>{
    state? refVideo.current?.play():refVideo.current?.pause()
  }
  const handleAudio = (state : boolean)=>{
    setMuted(state)
  }

  return (
    <section>
      <video 
        muted={muted} 
        ref={refVideo} 
        src={url}
      />
      <div className='flex justify-between'>

      </div>
    </section>
  )
}

export default Video