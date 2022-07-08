import React, {ReactChild} from 'react'
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import {useSelector} from "react-redux"
interface LayoutProps {
  children? :ReactChild | ReactChild[] ;
  style? : String;
  type? : string;
  providers? : object;
}

const LayoutPage : React.FC<LayoutProps>= ({children,style, type, providers}) => {
  const modalDetail = useSelector((state:any)=> state.post.modalDetail)
  return (
    <article className={`container ${type=="uploadVideo"&&"max-w-[1500px] md:overflow-y-hidden"} ${modalDetail&&"fixed"}`}>
        <Navbar type={type} providers={providers}/>
        <div className='flex'>
          {type!="uploadVideo"&&<Sidebar/>}
          {children}
        </div>
    </article>
  )
}

export default LayoutPage