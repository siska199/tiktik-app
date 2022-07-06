import React, {useRef, useState, } from 'react'
import { useDispatch } from 'react-redux'
import {AiOutlinePause} from "react-icons/ai"
import {FiPlay} from "react-icons/fi"
import {GiSpeaker, GiSpeakerOff} from "react-icons/gi"
import {handleModalDetail} from "../redux/actions/postActions"

interface Props {
  url : string;
  modalDetail? : boolean;
  setModalDetail? : React.Dispatch<React.SetStateAction<boolean>>
  type? : string;
  customeStyle ? : {
    video? : string;

  }
}

declare global {
  interface window {
    pageYOffset:  number;
  }
}

const Video : React.FC<Props> = ({url, modalDetail, setModalDetail, type, customeStyle}) => {
  const dispatch = useDispatch()
  const refVideo = useRef<HTMLVideoElement | null>(null)
  const [play, setPlay] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(false)
  
  const handlePausedUnpause = () =>{
    play ? refVideo?.current?.pause() : refVideo?.current?.play()
    setPlay(!play)
  }

  const handleAudio = ()=>{
    setMuted(!muted)
  }
  const handleOnClick = ()=>{
    switch(type){
      case "post":
        setModalDetail && setModalDetail(!modalDetail)
        dispatch(handleModalDetail(!modalDetail))
        break;
      case "detail":
        handlePausedUnpause()
      default:
        break;
    }
  }
  return (
    <section className=''>
      <video 
        className={`cursor-pointer ${customeStyle?.video}`}
        muted={muted} 
        ref={refVideo} 
        src={url}
        onClick={()=>handleOnClick()}
      />
      {
        type=="detail" && (
          <div className='bg-white/30 hidden group-hover:flex text-white h-full w-full absolute top-0 left-0'>
            <div className='m-auto '>
            {
              play?(
                <AiOutlinePause className='cursor-pointer text-[4rem] relative z-20' onClick={()=>handlePausedUnpause()}/>
              ):(
                <FiPlay className='cursor-pointer text-[4rem] relative z-20' onClick={()=>handlePausedUnpause()}/>
              )
            }
            </div>
          </div>
        )
      }
      {
        type=="post" && (
        <div className='flex gap-3 p-2 text-[1.2rem]'>
          {
            play?(
              <AiOutlinePause className='cursor-pointer' onClick={()=>handlePausedUnpause()}/>
            ):(
              <FiPlay className='cursor-pointer' onClick={()=>handlePausedUnpause()}/>
            )
          }
          {
            muted?(
              <GiSpeakerOff className='cursor-pointer' onClick={()=>handleAudio()}/>
            ):(
              <GiSpeaker className='cursor-pointer' onClick={()=>handleAudio()} />
            )
          }
        </div>
        )
      }
    </section>
  )
}

export default Video