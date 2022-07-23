import React from 'react'

interface DropdownProps {
    label? : string;
    dataCategory : {
      name : string;
      _id : string;
    }
    dataCategories : {
      _id : string;
      name:string;
    }[];
    handleOnChange: Function;
}

const Dropdown : React.FC<DropdownProps> = ({label,dataCategory,dataCategories, handleOnChange}) => {
  return (
    <div className='flex flex-col'>
        <label className='font-medium'>Choose a {label}</label>
        <select value={dataCategory.name} onChange={(e)=>handleOnChange(e)} name={label} className="border-[0.005rem] py-1 px-2 outline-none">
          <option value={"default"} data-id={""} hidden>Choose Category</option>
          {
            dataCategories.map((data,i)=>(
              <option key={i} value={data.name} data-id={data._id} >{data.name}</option>
            ))
          }
        </select>
    </div>
  )
}

export default Dropdown