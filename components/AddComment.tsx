import React, {useEffect, useRef, KeyboardEvent} from 'react'

const AddComment : React.FC = () => {
  const refInput = useRef<HTMLInputElement | null>(null)

  useEffect(()=>{
    // const handleSubmitByPressEnter = (e:KeyboardEvent<Element>)=>{
    //   if(e?.code=="Enter" || e.code=="NumpadEnter"){
    //     e.preventDefault()
    //     handleSubmit()
    //   }
    // }

    // document.addEventListener("keydown",handleSubmitByPressEnter)
    // return ()=>{
    //   document.removeEventListener("keydown",handleSubmitByPressEnter)
    // }
  },[])

  const handleSubmit = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    try {
      e.preventDefault()
    } catch (error) {
        throw error      
    }
    
  }
  return (
    <form autoComplete='off' className='w-full flex py-1 '>
        <input ref={refInput} placeholder='Add a comment...' className='placeholder:text-sm flex-grow outline-none '/>
        <button onClick={(e)=>handleSubmit(e)} className='font-semibold text-md text-main disabled:opacity-75' disabled={refInput?.current?.value?false:true} >Post</button>
    </form>
  )
}

export default AddComment
