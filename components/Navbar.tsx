import React from "react"
import {signIn, signOut} from "next-auth/react"
import {useSession} from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"
import Search from "./Search"
import {AiOutlineLogout,AiOutlinePlus} from "react-icons/ai"
import {FiSearch} from "react-icons/fi"
import {dataIconAuthProviders} from "../utils/data"
interface NavbarProps {
  type? : string;
  providers? : object;
}

const Navbar : React.FC<NavbarProps> = ({type, providers}) => {
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
        <button onClick={()=>handleUploadOnClick()}  className="border-[0.005rem] h-8 w-8 md:w-auto md:px-3 flex space-x-2 font-medium items-center justify-center text-[0.9rem]">
          <AiOutlinePlus/>
          <span className="hidden md:block ">Upload</span>
        </button>
        {
          session?(
            <>
              <img onClick={()=>router.push("/profile")} className="w-10 rounded-full cursor-pointer" src="https://i.pinimg.com/564x/3b/fe/3c/3bfe3ce20dbd887dcd5e8c4af0133adc.jpg"/>
              <button onClick={()=>signOut('google')} className="border-[0.005rem] p-2 flex shadow-lg rounded-full">
                <AiOutlineLogout className="m-auto text-[1.2rem] text-rose-700"/>       
              </button>
            </>
          ):(
            <>
              {
                providers&&Object.values(providers).map((provider,i)=>(
                  <button onClick={()=>signIn(provider.id)} key={i} className="border-[0.005rem] h-8 w-8 md:w-auto md:px-3 flex space-x-2 font-medium items-center justify-center text-[0.9rem]">
                    <span className="hidden md:block ">
                      Sign In With
                    </span>
                      {dataIconAuthProviders[i].icon}
                  </button>
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