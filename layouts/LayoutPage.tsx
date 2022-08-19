import React, {ReactChild} from 'react'
import { useSelector } from 'react-redux';
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { RootState } from '../redux/store';
interface LayoutProps {
  children? :ReactChild | ReactChild[] ;
  style? : String;
  type? : string;
  providers? : object;
}

const LayoutPage : React.FC<LayoutProps>= ({children,style, type, providers}) => {
  const modalDetail = useSelector<RootState>(state=>state.post.modalDetail)
  return (
    <main>

      <article className={`container ${modalDetail&&""} ${type=="uploadVideo"&&"max-w-[1500px] md:overflow-y-hidden"}`}>
          <Navbar type={type} providers={providers}/>
          <div className='flex'>
            {type!="uploadVideo"&&<Sidebar/>}
            {children}
          </div>
      </article>
    </main>
  )
}

export default LayoutPage