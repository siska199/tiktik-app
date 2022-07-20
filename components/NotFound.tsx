import React from 'react'
import {UppercaseTheFirstCharWord } from "../utils/function"
import {IoVideocamOffOutline} from "react-icons/io5"
import {BiCommentX} from "react-icons/bi"

interface Props{
    type: string;
}

const NotFound : React.FC<Props> = ({type, }) => {
  const fixType = UppercaseTheFirstCharWord(type)

  return (
    <section className={`flex flex-col font-thin  h-full items-center justify-center`}>
        <div className={`${type=="video"?"text-[5rem]":"text-[3rem]"} `}>
            {
                type=="video"?(
                    <IoVideocamOffOutline/>
                ):(
                    <BiCommentX/>
                )
            }
        </div>
        <h1 className={`${type=="video"?"text-[2rem]":"text-[1rem]"} `}>
            {fixType} Not Found 
        </h1>
    </section>
  )
}

export default NotFound