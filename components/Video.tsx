import React, {useEffect, useRef, useState, Dispatch, SetStateAction } from 'react'
import {AiOutlinePause} from "react-icons/ai"
import {FiPlay} from "react-icons/fi"
import {GiSpeaker, GiSpeakerOff} from "react-icons/gi"

interface Props {
  url : string;
  modalDetail? : boolean;
  setModalDetail? : React.Dispatch<React.SetStateAction<boolean>>
  type? : string;
}

declare global {
  interface window {
    pageYOffset:  number;
  }
}

const Video : React.FC<Props> = ({url, modalDetail, setModalDetail, type}) => {
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
  
  const handlePausedUnpause = () =>{
    play ? refVideo?.current?.pause() : refVideo?.current?.play()
    setPlay(!play)
  }

  const handleAudio = ()=>{
    setMuted(!muted)
  }
  const handleOnClick = ()=>{
    type=="detail" && setModalDetail(!modalDetail)
  }
  return (
    <section>
      <video 
        muted={muted} 
        ref={refVideo} 
        src={url}
        className="cursor-pointer"
        onClick={()=>handleOnClick()}
      />
      <div className='flex gap-3 p-2 text-[1.2rem]'>
        {
          play?(
            <AiOutlinePause onClick={()=>handlePausedUnpause()}/>
          ):(
            <FiPlay onClick={()=>handlePausedUnpause()}/>
          )
        }
        {
          muted?(
            <GiSpeakerOff onClick={()=>handleAudio()}/>
          ):(
            <GiSpeaker onClick={()=>handleAudio()} />
          )
        }
      </div>
    </section>
  )
}

export default Video