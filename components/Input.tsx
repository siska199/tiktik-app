import React from 'react'

interface InputProps{
    type : string;
    value: string;
    label? : string;
    style? : string;
    handleOnChange : Function;
}

const Input :React.FC<InputProps> = ({type, label, style, handleOnChange, value}) => {
  return (
    <div className='flex flex-col'>
        <label htmlFor="" className='font-medium'>{label}</label>
        <input value={value} onChange={(e)=>handleOnChange(e)} name={label} type={type} className="border-[0.005rem] py-1 px-2 outline-none"/>
    </div>
  )
}

export default Input