import React from 'react'
import Link from "next/link"
interface Props {
  title : String;
  icon : JSX.Element;
  active : boolean;
  number : number;
}

const Topic : React.FC <Props> = ({title,icon, number,active}) => {
  console.log("key: ", number)
  return (
    <Link href={`/?topic=${title.toLocaleLowerCase()}`} >
      <div className={`${active&&"text-main md:w-auto md:h-auto  md:bg-slate-200"} text-[1.2rem] border-0 md:border-[0.005rem] flex md:px-2 md:py-1 md:space-x-2 font-bold items-center justify-center rounded-full cursor-pointer`}>
        <div className={`${active && "border-2 rounded-full border-main p-1 border-[0.005rem] bg-slate-200 md:p-0 md:border-none"} `}>
          <img src={`icons/icon${number}.svg`} className="w-5 h-5"/>
        </div>
        <p className='text-[0.7rem] hidden md:block'>{title}</p>
      </div>
    </Link>
  )
}

export default Topic