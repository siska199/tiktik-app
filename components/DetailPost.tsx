import React, {Dispatch, SetStateAction} from 'react'
import {BsArrowLeft, BsFillSuitHeartFill} from "react-icons/bs"
import { useDispatch } from 'react-redux';
import {AiOutlineClose} from "react-icons/ai"
import Video from './Video';
import {dataDetail} from "../utils/data"
import {handleModalDetail} from "../redux/actions/postActions"
import UserInfo from './UserInfo';
import AddComment from './AddComment';

interface Props {
  setModalDetail : Dispatch<SetStateAction<boolean>>;
  modalDetail : boolean;
}

const DetailPost : React.FC<Props> = ({setModalDetail, modalDetail}) => {
  const dispatch = useDispatch()

  const handleCloseModal = ()=>{
    setModalDetail(!modalDetail)
    dispatch(handleModalDetail(!modalDetail))
  }
  return (
    <article className='fixed z-30 top-0 left-0 w-screen h-screen flex bg-black/50 sm:overflow-y-scroll'>
      <AiOutlineClose onClick={()=>handleCloseModal()} className='hidden sm:block absolute right-5 top-5 text-white font-bold text-[1.4rem] cursor-pointer '/>
      <div className='m-auto bg-white w-full h-full sm:w-[80%] sm:h-[90%] sm:rounded-md flex flex-col sm:flex-row md:!overflow-y-scroll'>
        
        <section className='w-full h-10 sticky top-0 bg-white sm:hidden flex items-center px-3 py-2'>
          <BsArrowLeft className='text-[1.5rem] cursor-pointer'  onClick={()=>handleCloseModal()} />
        </section>

        <section className={`bg-detail-video group sticky top-10 flex justify-center items-center sm:rounded-l-md `}>
          <Video url={dataDetail.video} type="detail" customeStyle={{video:"lg:w-[50vw] md:w-[35vw] sm:w-[40vw] w-full relative z-10"}}/>
        </section>

        <section className='flex flex-col h-full w-full sm:w-[40%] flex-grow'>
          <div className='border-b-[0.005rem] w-full py-5 flex flex-col px-5 gap-5 '>
              <UserInfo image={dataDetail.image} username={dataDetail.username} name={dataDetail.name} type={"detail"} caption={dataDetail.caption}/>
              <p className='text-sm leading-[1.2rem] font-thin sm:max-h-[20vh] sm:overflow-y-scroll'>{dataDetail.caption}</p>
              <div className=''>
                <div className='w-10 h-10 flex rounded-full bg-slate-200 cursor-pointer'>
                  <BsFillSuitHeartFill className={`m-auto text-main`}/>
                </div>
                <p className='font-semibold text-sm w-10 flex justify-center'>{dataDetail.likes}</p>
              </div>
          </div>

          <div className='h-1/2 flex flex-col p-5 '>
            <div className='flex flex-col gap-3 sm:max-h-[30vh] overflow-y-scroll'>
              {
                dataDetail.comments.map((data,i)=>(
                  <div key={i}>
                    <UserInfo username={data.username} image={data.image} type="comment" comment={data.comment} />
                  </div>
                ))
              }
            </div>
            <div className='h-auto mt-auto '>
                <AddComment/>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}

export default DetailPost