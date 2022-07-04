import React, {useEffect, useRef, useState} from 'react'
import {AiOutlinePause} from "react-icons/ai"
import {FiPlay} from "react-icons/fi"
import {GiSpeaker, GiSpeakerOff} from "react-icons/gi"

interface Props {
  url : string;
}
declare global {
  interface window {
    pageYOffset:  number;
  }
}

const Video : React.FC<Props> = ({url}) => {
  const refVideo = useRef<HTMLVideoElement | null>(null)
  const [play, setPlay] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(false)

  // useEffect(()=>{
  //   window.addEventListener('scroll',handleSroll)
  //   return ()=>{
  //     window.removeEventListener("scroll", handleSroll)
  //   }  
  // },[])

  // const handleSroll = ()=>{
  //   const distanceElToTopScreen : number | undefined = refVideo.current?.getBoundingClientRect()?.top
  //   if(distanceElToTopScreen) if(distanceElToTopScreen>0 && distanceElToTopScreen<200){
  //     handlePausedUnpause(true)
  //     setPlay(true)
  //   }else{
  //     handlePausedUnpause(false)
  //     setPlay(false)
  //   }
  // }
  
  const handlePausedUnpause = (state : boolean, changeState? : boolean) =>{
    console.log("state",state)
    state ? refVideo?.current?.play():refVideo?.current?.pause()
    changeState && setPlay(state)
  }

  const handleAudio = ()=>{
    setMuted(!muted)
  }

  return (
    <section>
      <video 
        muted={muted} 
        ref={refVideo} 
        src={url}
      />
      <div className='flex gap-3 p-2 text-[1.2rem]'>
        {
          play?(
            <AiOutlinePause onClick={()=>handlePausedUnpause(!play, true)}/>
          ):(
            <FiPlay onClick={()=>handlePausedUnpause(!play, true)}/>
          )
        }
        {
          muted?(
            < GiSpeakerOff onClick={()=>handleAudio()}/>
          ):(
            <GiSpeaker onClick={()=>handleAudio()} />
          )
        }
      </div>
    </section>
  )
}

export default Video