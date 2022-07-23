import React, {useEffect, useState, useRef } from 'react'
import { useDispatch} from 'react-redux'
import {AiOutlinePause} from "react-icons/ai"
import {FiPlay} from "react-icons/fi"
import {GiSpeaker, GiSpeakerOff} from "react-icons/gi"
import {handleModalDetail} from "../redux/actions/postActions"
import DetailPost from "./DetailPost"
import Modal from "../layouts/Modal"
import { useSession } from 'next-auth/react'
import { handleTooltipAuth } from '../redux/actions/authAction'
import {BsBookmarkHeart,BsFillBookmarkHeartFill} from "react-icons/bs"

interface Props {
  url : string  | undefined; 
  _idPost?:string;
  type? : string;
  video? : string;
  bookmark : string; 
}

declare global {
  interface window {
    pageYOffset:  number;
  }
}

const Video : React.FC<Props> = ({url, _idPost, type, video="", bookmark}) => {
  console.log("bookmark video: ", bookmark)
  const {data:session} = useSession()
  const dispatch = useDispatch()
  const refVideo = useRef<HTMLVideoElement | null>(null)
  const [modalDetail, setModalDetail] = useState<boolean>(false)
  const [play, setPlay] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(false)

  useEffect(()=>{
    const observerVideo = new IntersectionObserver(handleIntersect,{
      threshold : 1.0,
    })
    if(type=="post" && refVideo.current ){    
      observerVideo.observe(refVideo.current)
    }
    return ()=>{
      (type=="post" && refVideo.current ) && observerVideo.unobserve(refVideo.current)
    }
  },[])

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
        if(session){
          play&&handlePausedUnpause()
          setModalDetail && setModalDetail(!modalDetail)
          dispatch(handleModalDetail(!modalDetail))
        }else{
          dispatch(handleTooltipAuth(true))
          setTimeout(()=>{
            dispatch(handleTooltipAuth(false))
          },5000)
        }
        break;
      case "detail":
        handlePausedUnpause()
      default:
        break;
    }
  }
  const handleIntersect = (entries, observer)=>{
    type=="post" && entries.forEach((entry,i)=>{
      if(entry.isIntersecting){ 
        // entry.target.play()
        // setPlay(true)
        }else{
          entry.target.pause()
          setPlay(false)
        }
      })
    
  }
  const handleBookmark = ()=>{

  }

  return (
    <section className='relative '>
      {
        session&&(
        <div onClick={()=>handleBookmark()} className={`absolute ${type=="detail"&&"z-[99] shadow-md"} text-[1.5rem] z-[20] w-10 h-10 flex rounded-full group ${bookmark&&"hover:bg-slate-300"} hover:bg-slate-200 cursor-pointer right-2 top-2 `}>
          <BsBookmarkHeart className={`m-auto ${bookmark&&"text-rose-600"} text-stone-500 `}/>
        </div>
        )
      }
      <video 
        className={`cursor-pointer ${video}`}
        muted={muted}
        ref={refVideo} 
        src={url}
        onEnded= {()=>setPlay(false)}
        onClick={()=>handleOnClick()}
        controls={type =="post" || type=="profile"?false:true}
      />
      {
        (type=="profile") && (
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