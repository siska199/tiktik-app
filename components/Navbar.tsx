import Image from "next/image"

import {AiOutlineLogout,AiOutlinePlus} from "react-icons/ai"
import {FiSearch} from "react-icons/fi"
import Search from "./Search"

const Navbar = () => {

  return (
    <nav className="border-b-[0.05rem] flex justify-between items-center px-2 md:px-0 py-2 space-x-2">
      <img className="w-20 object-contain md:w-[8rem] md:h-10" src="/tiktik-logo.png"/>
      <Search/>
      <section className="flex justify-between items-center space-x-3 md:space-x-8 ">
        <button className='md:hidden border-2 h-8 w-8  flex justify-center items-center border-gray-200'>
          <FiSearch />
        </button>
        <button className="border-2 h-8 w-8 md:w-auto md:px-3 flex space-x-2 font-medium items-center justify-center text-[0.9rem]">
          <AiOutlinePlus/>
          <span className="hidden md:block ">Upload</span>
        </button> 
        <img className="w-10 rounded-full" src="https://i.pinimg.com/564x/3b/fe/3c/3bfe3ce20dbd887dcd5e8c4af0133adc.jpg"/>
        <button className="border-2 p-2 flex shadow-lg rounded-full">
          <AiOutlineLogout className="m-auto text-[1.2rem] text-rose-700"/>       
        </button>
      </section>
    </nav>
  )
}

export default Navbar