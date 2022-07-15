import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {BsArrowLeft, BsFillSuitHeartFill} from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux';
import {AiOutlineClose} from "react-icons/ai"
import Video from './Video';
import {handleModalDetail, handleGetPost} from "../redux/actions/postActions"
import UserInfo from './UserInfo';
import AddComment from './AddComment';

interface Props {
  setModalDetail : Dispatch<SetStateAction<boolean>>;
  modalDetail : boolean;
  _idPost : string;
}

const DetailPost : React.FC<Props> = ({setModalDetail, modalDetail, _idPost}) => {
  const dispatch = useDispatch()
  const post = useSelector(state=> state.post.post)
  const [render, setRender] = useState(false)

  useEffect(()=>{
    dispatch(handleGetPost(_idPost))
  },[render])

  const handleCloseModal = ()=>{
    setModalDetail(!modalDetail)
    dispatch(handleModalDetail(!modalDetail))
  }

  return (
    <>
      {
        post.video && (
          <article className={`fixed z-30 top-0 left-0 w-screen h-screen flex bg-black/50 sm:overflow-y-scroll`}>
            <AiOutlineClose onClick={()=>handleCloseModal()} className='hidden sm:block absolute right-5 top-5 text-white font-bold text-[1.4rem] cursor-pointer '/>
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
                      <div className='w-10 h-10 flex rounded-full bg-slate-200 cursor-pointer'>
                        <BsFillSuitHeartFill className={`m-auto ${post.like?"text-main":"text-gray-400"}`}/>
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
          </article>
        )
      }
    </>
  )
}

export default DetailPost