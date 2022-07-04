import React from 'react'

interface Props {
  title : String;
  icon : JSX.Element
}

const Topic : React.FC <Props> = ({title,icon}) => {
  return (
    <button className='text-[1.2rem] border-0 md:border-[0.005rem] flex md:px-2 md:py-1 md:space-x-2 font-bold items-center justify-center rounded-full'>
      {icon}
      <p className='text-[0.7rem] hidden md:block'>{title}</p>
    </button>
  )
}

export default Topic