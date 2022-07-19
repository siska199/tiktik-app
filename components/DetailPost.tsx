import React, { useEffect, useState} from 'react'
import {BsArrowLeft, BsFillSuitHeartFill} from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux';
import Video from './Video';
import {handleGetPost, handleAddRemoveLove} from "../redux/actions/postActions"
import UserInfo from './UserInfo';
import AddComment from './AddComment';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { handleModalAuth } from '../redux/actions/authAction';

interface Props {
  _idPost : string | string[] | undefined;
}

const DetailPost : React.FC<Props> = ({ _idPost}) => {
  const router = useRouter()
  const {data:session} = useSession() 
  const dispatch = useDispatch()
  const post = useSelector(state=> state.post.post)
  const [render, setRender] = useState(false)

  useEffect(()=>{
    dispatch(handleGetPost(_idPost))
  },[render])

  const handleLove = ()=>{
    if(session){
      dispatch(handleModalAuth())
      return
    }

    const dataLove = {
      idPost : _idPost,
      like: post.like
    }
    dispatch(handleAddRemoveLove(dataLove)).then(()=>{
      setRender(!render)
    })
  }

  return (
    <>
      {
        post.video && (
            <div className='m-auto bg-white w-full h-full sm:w-[80%] sm:h-[90%] sm:rounded-md flex flex-col sm:flex-row md:!overflow-y-scroll'>
              <section className='w-full h-10  bg-white sm:hidden flex items-center px-3 py-2'>
                <BsArrowLeft className='text-[1.5rem] cursor-pointer'  onClick={()=>handleCloseModal()} />
              </section>
  
              <section className={` group flex justify-center items-center sm:rounded-l-md `}>
                <Video url={post.video.url} type="detail" customeStyle={{video:"lg:w-[50vw] md:w-[35vw] sm:w-[40vw] w-full relative z-10"}}/>
              </section>
              
              <section className='flex flex-col h-full w-full sm:w-[40%] flex-grow'>
                <div className='border-b-[0.005rem] w-full py-5 flex flex-col px-5 gap-5 '>
                    <UserInfo image={post.postBy.image} username={post.postBy.username} name={post.postBy.name} type={"detail"} />
                    <p className='text-sm leading-[1.2rem] font-thin sm:max-h-[20vh] sm:overflow-y-scroll'>{post.caption}</p>
                    <div className=''>
                      <div onClick={()=>handleLove()} className={`${!session&&"pointer-events-none"} w-10 h-10 flex rounded-full bg-slate-200 cursor-pointer`}>
                        <BsFillSuitHeartFill className={`m-auto ${post.like != -1?"text-main":"text-gray-400"}`}/>
                      </div>
                      <p className='font-semibold text-sm w-10 flex justify-center'>{post.countLikes}</p>
                    </div>
                </div>
  
                <div className='h-full flex flex-col p-5'>
                  <div className='flex flex-col gap-3 sm:max-h-[30vh] overflow-y-scroll'>
                    {
                      post.comments && post.comments.map((data,i)=>(
                        <div key={i}>
                          <UserInfo username={data.postBy.username} image={data.postBy.image} type="comment" comment={data.field} />
                        </div>
                      ))
                    }
                  </div>
                  <div className='h-auto mt-auto '>
                      <AddComment setRender={setRender} render={render}/>
                  </div>
                </div>
              </section>
            </div>
        )
      }
    </>
  )
}

export default DetailPost