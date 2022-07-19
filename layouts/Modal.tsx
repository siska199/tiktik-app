import React, {ReactChild} from 'react'
import { useDispatch } from 'react-redux';
import {AiOutlineClose} from "react-icons/ai"
import {handleModalDetail} from "../redux/actions/postActions"
import Router, { useRouter } from 'next/router';

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
    <article className={`fixed z-30 top-0 left-0 w-screen h-screen flex bg-black/50 sm:overflow-y-scroll`}>
      <AiOutlineClose onClick={()=>handleCloseModal()} className='hidden sm:block absolute right-5 top-5 text-white font-bold text-[1.4rem] cursor-pointer '/>
      {children}
    </article>
    )
}

export default Modal