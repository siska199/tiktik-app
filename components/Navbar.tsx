import React from "react"
import {signIn, signOut} from "next-auth/react"
import {useSession} from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"
import Search from "./Search"
import {AiOutlineLogout,AiOutlinePlus} from "react-icons/ai"
import {FiSearch} from "react-icons/fi"
import {dataIconAuthProviders} from "../utils/data"
import Tooltip from "./Tooltip"
import {useSelector } from "react-redux"

interface NavbarProps {
  type? : string;
  providers? : object;
}

const Navbar : React.FC<NavbarProps> = ({type, providers}) => {
  const tooltipAuth = useSelector(state=>state.auth.tooltipAuth)
  const router = useRouter()
  const {data:session} = useSession()
  const handleUploadOnClick = ()=>{
    router.push("/upload-video")
  }

  
  return (
    <nav className={`${type=="uploadVideo"&&"!max-w-[1100px] mx-auto"} sticky top-0 bg-white border-b-[0.05rem] flex justify-between items-center px-2 md:px-0 py-2 space-x-2 z-30`}>
      <Link href="/" >
        <img className="w-20 object-contain md:w-[8rem] md:h-10 cursor-pointer" src="/tiktik-logo.png"/>
      </Link>
      <Search/>
      <section className="flex justify-between items-center space-x-3 md:space-x-8 ">
        <button className='md:hidden border-[0.005rem] h-8 w-8  flex justify-center items-center border-gray-200'>
          <FiSearch />
        </button>
        {
          session?(
            <>
              <button onClick={()=>handleUploadOnClick()}  className="border-[0.005rem] h-8 w-8 md:w-auto md:px-3 flex space-x-2 font-medium items-center justify-center text-[0.9rem]">
                <AiOutlinePlus/>
                <span className="hidden md:block ">Upload</span>
              </button>
              <img onClick={()=>router.push("/profile")} className="w-10 rounded-full border-[0.005rem] cursor-pointer" src={session?.user?.image}/>
              <button onClick={()=>signOut('google')} className="border-[0.005rem] p-2 flex rounded-full">
                <AiOutlineLogout className="m-auto text-[1.2rem] text-rose-700"/>       
              </button>
            </>
          ):(
            <>
              {
                providers&&Object.values(providers).map((provider,i)=>(
                  <div  key={i} className="relative group">
                    <button onClick={()=>signIn(provider.id)} className="border-[0.005rem] h-8 w-8 md:w-auto md:px-3 flex md:space-x-2 font-medium items-center justify-center text-[0.9rem]">
                      <span className="hidden md:block ">
                        Sign In With
                      </span>
                        {dataIconAuthProviders[i].icon}
                    </button>
                    {tooltipAuth&& <Tooltip message={"Log in here"}/>}
                  </div>
                ))
              }
            </>
          )
        }
      </section>
    </nav>
  )
}

export default Navbar