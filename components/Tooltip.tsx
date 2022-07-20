import React from 'react'

const Tooltip : React.FC<{message:string}> = ({message}) => {
  return (
    <div className="absolute mt-2 w-full flex-col items-center flex  group-hover:flex">
    <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-500"></div>
        <span className="relative z-10 p-2 -mt-2 text-center text-xs leading-none text-white whitespace-no-wrap bg-gray-500 shadow-lg rounded-md">{message}</span>
    </div>  )
}

export default Tooltip