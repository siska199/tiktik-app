import React from 'react'
import {FiSearch} from "react-icons/fi"

const Search = () => {
  return (
    <section>
      <div className='hidden md:flex rounded-full border-2  w-[20rem] divide-x-2 divide-gray-300 py-2 px-3 md:flex-grow-0 bg-gray-200  items-center'>
        <input placeholder='Search accounts  and videos' className='w-[80%] bg-gray-200 placeholder:text-gray-400 placeholder:font-medium'/>
        <div className=' flex justify-center items-center w-[20%] '>
          <FiSearch className=' text-[1.15rem] text-gray-400'/>
        </div>
      </div>

    </section>
  )
}

export default Search