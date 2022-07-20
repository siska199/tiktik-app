import React, {ReactChild} from 'react'
import { useDispatch } from 'react-redux';
import {AiOutlineClose} from "react-icons/ai"
import {BsArrowLeft} from "react-icons/bs"
import {handleModalDetail} from "../redux/actions/postActions"

interface ModalProps {
  children : ReactChild;
  type : string;
  modal:boolean;
  setModal : React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal : React.FC<ModalProps> = ({children, type, modal, setModal}) => {
  const dispatch = useDispatch()
  const handleCloseModal = ()=>{
    setModal(!modal)
    switch(type){
      case "detail":
        dispatch(handleModalDetail(!modal))
        break;
      default:
        break;
    }
  }

  return (
    <article className={`fixed z-30 top-0 left-0 w-screen h-screen flex bg-black/50 sm:overflow-y-scroll flex flex-col`}>
      <AiOutlineClose onClick={()=>handleCloseModal()} className='hidden sm:block absolute right-5 top-5 text-white font-bold text-[1.4rem] cursor-pointer '/>
        <section className='w-full h-10  bg-white sm:hidden flex items-center px-3 py-2'>
            <BsArrowLeft className='text-[1.5rem] cursor-pointer'  onClick={()=>handleCloseModal()} />
        </section>
      {children}
    </article>
    )
}

export default Modal