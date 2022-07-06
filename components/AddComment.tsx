import React, {useEffect, useState} from 'react'


const AddComment : React.FC = () => {
  const [comment, setComment] = useState<string>("")

  useEffect(()=>{
    
  },[])
  
  const handleSubmitByPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) : void=>{
    if(e.key=="Enter"){
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = (e? : React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    try {
      e && e.preventDefault()
      setComment("")
    } catch (error) {
        throw error      
    }
    
  }
  return (
    <form autoComplete='off' className='w-full flex py-1 '>
        <input onKeyDown={(e)=>handleSubmitByPressEnter(e)} value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='Add a comment...' className='placeholder:text-sm flex-grow outline-none '/>
        <button onClick={(e)=>handleSubmit(e)} className='font-semibold text-md text-main disabled:opacity-75' disabled={comment ==""?true:false} >Post</button>
    </form>
  )
}

export default AddComment
