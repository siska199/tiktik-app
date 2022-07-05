import React from 'react'
import {MdVerified} from "react-icons/md"
interface Props{
  image : string;
  username: string;
  name? : string;
  caption? : string;
  comment? : string;
  type? : string;
}


const UserInfo : React.FC<Props> = ({image,username,name, type, caption, comment}) => {
  const style = {
    username : "text-[0.7rem] font-semibold text-gray-400",
    caption : "font-normal",
    comment : "text-sm font-thin"
  }
  let size = ""
  let h1 = ""
  let detail = ""
  let styleDetail = ""
  switch(type){
    case "suggested":
      size = "w-8 h-8"
      h1 = "text-[0.9rem]" 
      styleDetail = style.username
      if(name) detail = name
      break;
    case "post":
      size ="w-10 h-10"
      styleDetail = style.caption
      if(caption) detail = caption
      break;
    case "detail":
      size="w-10 h-10"
      styleDetail = style.username
      if(name) detail = name
      break;
    case "comment":
      size = "w-8 h-8"
      styleDetail = style.comment
      if(comment) detail = comment
      break;
  }

  return (
    <section className='flex space-x-2'>
      <img src={image} className={`${size} rounded-full`} />
      <div className=''>
        <h1 className={`flex ${h1} items-center gap-1 font-bold ${type=="comment"&&"font-semibold text-[0.92rem]"}`}>
          {username}
          <MdVerified className='text-sky-400 text-[0.9rem]'/>
          {type=="post"&&<p className={`${style.username}`}>{username}</p>}
        </h1>
        <p className={ `${styleDetail}`}>
          {detail}
        </p>
      </div>
    </section>
  )
}

export default UserInfo