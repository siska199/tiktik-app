import React, {useEffect, useState, useRef } from 'react'
import { useRouter } from "next/router"
import { useDispatch} from 'react-redux'
import {AiOutlinePause} from "react-icons/ai"
import {FiPlay} from "react-icons/fi"
import {GiSpeaker, GiSpeakerOff} from "react-icons/gi"
import {handleModalDetail} from "../redux/actions/postActions"
import DetailPost from "./DetailPost"
import Modal from "../layouts/Modal"
interface Props {
  url : string  | undefined; 
  _idPost?:string;
  type? : string;
  customeStyle ? : {
    video? : string 
  }
}

declare global {
  interface window {
    pageYOffset:  number;
  }
}

const Video : React.FC<Props> = ({url, _idPost, type, customeStyle={video:""}}) => {
  const dispatch = useDispatch()
  const refVideo = useRef<HTMLVideoElement | null>(null)
  const [modalDetail, setModalDetail] = useState<boolean>(false)
  const [play, setPlay] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(true)
  
  const handlePausedUnpause = () =>{
    play ? refVideo?.current?.pause() : refVideo?.current?.play()
    setPlay(!play)
  }

  const handleAudio = ()=>{
    setMuted(!muted)
  }
  const handleOnClick = ()=>{
    switch(type){
      case "post": case "profile":
        play&&handlePausedUnpause()
        setModalDetail && setModalDetail(!modalDetail)
        dispatch(handleModalDetail(!modalDetail))
        break;
      case "detail":
        handlePausedUnpause()
      default:
        break;
    }
  }

  useEffect(()=>{
    const observerVideo = new IntersectionObserver(handleIntersect,optionsObserver)
    
    if(type=="post") observerVideo.observe(refVideo.current)
    return ()=>{
      (type=="post" && refVideo.current ) && observerVideo.disconnect(refVideo.current)
      setPlay(false)
    }
  },[])

  const handleIntersect = (entries, observer)=>{
    type=="post" && entries.forEach((entry,i)=>{
      if(entry.isIntersecting){ 
          refVideo?.current && setMuted(false)
          entry.target.play()
          setPlay(true)
        }else{
          entry.target.pause()
          setPlay(false)
        }
      })
    
  }

  const optionsObserver = {
    threshold : 1.0,
  }
  return (
    <section className='relative'>
      <video 
        className={`cursor-pointer ${customeStyle?.video}`}
        muted={muted}
        ref={refVideo} 
        src={url}
        onEnded= {()=>setPlay(false)}
        onClick={()=>handleOnClick()}
        controls={type =="post" || type=="profile"?false:true}
      />
      {
        (type=="post" || type=="profile") && (
        <div className={`absolute bottom-0 left-0 text-white border-none flex gap-3 p-2 text-[1.2rem]`}>
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
      {
        modalDetail &&
        <Modal type="detail" modal={modalDetail} setModal={setModalDetail}>
          <DetailPost _idPost={_idPost} />
        </Modal>
      }
    </section>
  )
}

export default Video