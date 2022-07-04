import React from 'react'
import { dataListsFooter } from '../utils/data'

const Footer = ()  => {
  return (
    <ul className='hidden md:flex flex-col gap-4 p-3 text-[0.75rem] text-gray-400 font-semimedium'>
      {
        dataListsFooter.map((datalist,i)=>(
        <li key={i} className=" flex flex-wrap gap-2 ">
          {
            datalist.map((data,i)=>(
            <span key={i} className="leading-[0.5rem]">
              {data}
            </span>))
          }
        </li>))
      }
      <li>@Copyright 2022</li>
    </ul>
  )
}

export default Footer