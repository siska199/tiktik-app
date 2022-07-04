import React from 'react'

interface Props{
    title : String;
}

const TitleSectionSideNavbar : React.FC<Props> = ({title}) => {
  return (
    <h2 className='hidden md:block font-bold text-gray-500 text-sm '>{title}</h2>
  )
}
export default TitleSectionSideNavbar