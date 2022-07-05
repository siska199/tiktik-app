import React, {ReactChild} from 'react'
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import {useSelector} from "react-redux"
interface LayoutProps {
  children? :ReactChild | ReactChild[] ;
  style? : String 
}

const LayoutPage : React.FC<LayoutProps>= ({children,style}) => {
  const modalDetail = useSelector((state:any)=> state.post.modalDetail)
  console.log("modaldetail: ", modalDetail)
  return (
    <article className={`container ${modalDetail&&"fixed"}`}>
        <Navbar/>
        <div className='flex'>
          <Sidebar/>
          {children}
        </div>
    </article>
  )
}

export default LayoutPage