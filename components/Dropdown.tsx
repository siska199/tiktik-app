import React from 'react'

interface DropdownProps {
    label? : string;
    dataCategory : string[];
    handleOnChange: Function;
}

const Dropdown : React.FC<DropdownProps> = ({label,dataCategory, handleOnChange}) => {
  
  return (
    <div className='flex flex-col'>
        <label className='font-medium'>Choose a {label}</label>
        <select onChange={(e)=>handleOnChange(e)} name={label} className="border-[0.005rem] py-1 px-2 outline-none">
          {
            dataCategory.map((data,i)=>(
              <option key={i} value={data}>{data}</option>
            ))
          }
        </select>
    </div>
  )
}

export default Dropdown