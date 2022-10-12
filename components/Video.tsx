import React, {useEffect, useState, useRef } from 'react'
import { useDispatch} from 'react-redux'
import { useSession } from 'next-auth/react'
import {AiOutlinePause} from "react-icons/ai"
import {FiPlay} from "react-icons/fi"
import {GiSpeaker, GiSpeakerOff} from "react-icons/gi"
import {BsBookmarkHeart} from "react-icons/bs"
import {handleModalDetail, handleAddRemoveBookmark} from "../redux/actions/postActions"
import { handleTooltipAuth } from '../redux/actions/authAction'
import DetailPost from "./DetailPost"
import Modal from "../layouts/Modal"

interface Props {
  url : string  | undefined; 
  _idPost?:string ;
  type? : string;
  bookmark? : string; 
  setRender? : React.Dispatch<React.SetStateAction<boolean>>
  render? : boolean;
}

declare global {
  interface window {
    pageYOffset:  number;
  }
}

const Video : React.FC<Props> = ({url, _idPost, type, bookmark, setRender, render}) => {
  const {data:session} = useSession()
  const dispatch = useDispatch()
  const refVideo = useRef<HTMLVideoElement | null>(null)
  const [modalDetail, setModalDetail] = useState<boolean>(false)
  const [play, setPlay] = useState<boolean>(true)
  const [muted, setMuted] = useState<boolean>(false)
  
  let videoStyle=""
  switch(type){
    case "profile":
      videoStyle = "rounded-lg w-full"
      break;
    case "post":
      videoStyle = "sm:rounded-lg"
      break;
    case "detail":
      videoStyle = "lg:w-[50vw] md:w-[35vw] sm:w-[40vw] w-full relative z-10"
      break;
    default:
      break;
  }

  useEffect(()=>{
    const observerVideo = new IntersectionObserver(handleIntersect,{
      threshold : 1.0,
    })
    if((type=="profile" || type=="post")  && refVideo.current ){   
      observerVideo.observe(refVideo.current)
    }
    return ()=>{
      (type=="profile" && refVideo.current ) && observerVideo.unobserve(refVideo.current)
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
  const handleIntersect = (entries:any, observer:any)=>{
    entries.forEach((entry:any,i:number)=>{
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
    const dataBookmark = {
      idPost : _idPost,
      bookmarkKeyUser: bookmark
    }
    dispatch(handleAddRemoveBookmark(dataBookmark)).then(()=>{
      setRender && setRender(!render)
    })
  }

  return (
    <section className='relative '>
      {
        type=="detail" &&(
        <div onClick={()=>handleBookmark()} className={`absolute ${type=="detail"&&"z-[99]"} text-[1.5rem] z-[20] w-10 h-10 flex rounded-full group ${bookmark&&"hover:bg-slate-300"} hover:bg-slate-200 cursor-pointer right-2 top-2 `}>
          <BsBookmarkHeart style={{color:`${bookmark&&"red"}`}} className={`m-auto text-stone-500 `}/>
        </div>
        )
      }
      {
        url && (
          <div className={`cursor-pointer ${videoStyle}`}>
            <video 
              className='w-full'
              muted={muted}
              ref={refVideo} 
              src={url}
              onEnded= {()=>setPlay(false)}
              onClick={()=>handleOnClick()}
              controls={type =="post" || type=="profile"?false:true}
            />
          </div>
        )
      }
      {
        (type=="profile") && (
        <div className={`absolute bottom-0 left-0 text-white border-none flex gap-3 p-2 text-[1.2rem] animate-video-appear`}>
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
          <DetailPost _idPost={_idPost?_idPost:""} />
        </Modal>
      }
    </section>
  )
}

export default Video