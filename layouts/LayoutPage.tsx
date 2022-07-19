import React, {ReactChild} from 'react'
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
interface LayoutProps {
  children? :ReactChild | ReactChild[] ;
  style? : String;
  type? : string;
  providers? : object;
}

const LayoutPage : React.FC<LayoutProps>= ({children,style, type, providers}) => {

  return (
    <article className={`container ${type=="uploadVideo"&&"max-w-[1500px] md:overflow-y-hidden"}`}>
        <Navbar type={type} providers={providers}/>
        <div className='flex'>
          {type!="uploadVideo"&&<Sidebar/>}
          {children}
        </div>
    </article>
  )
}

export default LayoutPage