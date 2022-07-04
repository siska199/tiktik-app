import React, {ReactChild} from 'react'
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

interface LayoutProps {
  children? :ReactChild | ReactChild[] ;
  style? : String 
}

const LayoutPage : React.FC<LayoutProps>= ({children,style}) => {
  return (
    <article className='container'>
        <Navbar/>
        <Sidebar/>
      {children}
    </article>
  )
}

export default LayoutPage