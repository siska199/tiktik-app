import React from 'react'
import Link from "next/link"
interface Props {
  title : String;
  icon : JSX.Element;
  active : boolean;
}

const Topic : React.FC <Props> = ({title,icon, active}) => {
  return (
    <Link href={`/?topic=${title.toLocaleLowerCase()}`} >
      <div className={`${active&&"text-main"} text-[1.2rem] border-0 md:border-[0.005rem] flex md:px-2 md:py-1 md:space-x-2 font-bold items-center justify-center rounded-full cursor-pointer`}>
        {icon}
        <p className='text-[0.7rem] hidden md:block'>{title}</p>
      </div>
    </Link>
  )
}

export default Topic