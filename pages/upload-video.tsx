import type { NextPage } from 'next'
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BsFillCloudUploadFill} from "react-icons/bs"
import {AiOutlineClose} from "react-icons/ai"
import LayoutPage from '../layouts/LayoutPage'
import Video from '../components/Video'
import Input from '../components/Input'
import Dropdown from '../components/Dropdown'
import Alert from '../components/Alert'
import LoadingIcon from '../components/LoadingIcon'
import {handleGetCategories} from "../redux/actions/categoryAction"
import { handleAddPost } from '../redux/actions/postActions'
import { handleFormValidationPost } from '../utils/function/formValidation'
import { RootState } from '../redux/store'

interface PropsUploadVideo{
  categories? : {
    _id:string;
    name:string;
  }[]
}

const UploadVideo : NextPage<PropsUploadVideo> = () => {
  const dispatch = useDispatch()
  const categories = useSelector<RootState>(state=>state.category.categories)
  
  useEffect(()=>{
    dispatch<any>(handleGetCategories())
  },[])
  
  const initialForm = {
    video : null,
    caption : "",
    category: {
      name :"default",
      _id : ""
    }
  }
  const initialAlert = {
    show:false, 
    type:"", 
    message:""
  }
  const [form, setForm] = useState(initialForm)
  const [videoUrl, setVideoUrl] = useState<string | undefined | null>("")
  const [alert, setAlert] = useState(initialAlert)
  const [loading, setLoading] = useState(false)
  const inputVideoRef = useRef<HTMLInputElement | null>(null)

  const handleOnSelectUpload = ()=>{
    inputVideoRef.current?.click()
  }
  const handleCloseVideo = ()=>{
    setVideoUrl(null)
    setForm({
      ...form,
      video : initialForm.video
    })
  }
  const handleOnChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement |any>)=>{
    const name = e.target.name.toLowerCase()
    let data : File | string|object = ""
    switch(name){
      case "video":
        data = (e.target.files as FileList)[0]
        break;
      case "category":
        data = {
          name : e.target.value,
          _id :  e.target.options[e.target.selectedIndex].dataset.id
        }
        break;
      default:
        data = e.target.value
        break;
    }
    setForm({
      ...form,
      [name] : data,
    })

    if(name=="video"){
      const reader = new FileReader()
      reader.readAsDataURL(data as File);
      reader.onload = (rederEvent : ProgressEvent<FileReader>)=>{
        const url = typeof(rederEvent.target?.result)=="string"?rederEvent.target?.result:""
        setVideoUrl(url)
      }
    }
  }
  const handleOnSubmit = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    try {
      e.preventDefault()
      const msgValidateForm = handleFormValidationPost(form)
      if(msgValidateForm){
        setAlert({show:true, type:"error", message: msgValidateForm})
        setTimeout(()=>{
          setAlert(initialAlert)
        },2500)
        return ""
      }
      setLoading(true)
      dispatch(handleAddPost(form))
      .then(()=>{
        setForm(initialForm)
        setVideoUrl(null)
        setLoading(false)
        setAlert({show:true, type:"success", message:"Post video success"})
        setTimeout(()=>{
          setAlert(initialAlert)
        },2500)
      })
    } catch (error) {
      throw error
    }
  }
  const handleOnDiscard = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault()
    setForm(initialForm)
    setVideoUrl(null)
  }

  return (
    <LayoutPage type="uploadVideo">

      <div className='flex-1 flex-col flex-grow md:py-5 bg-gray-100 flex justify-center items-center w-full h-full '>
          <div className='m-auto w-full flex flex-col md:w-[50rem] h-[35rem] bg-white rounded-lg p-10 md:overflow-hidden'>
            <header className='mb-5'>
              <h1 className='font-semibold text-[1.3rem]'>Upload Video</h1>
              <p className='text-gray-400 font-semimedium'>Post a video to your account</p>
            </header>
            
            <article className='flex flex-col md:flex-row'>
              <section onClick={()=>handleOnSelectUpload()} className={`flex relative items-center ${videoUrl?"bg-black":"bg-gray-100 border-dashed border-rose-300 border-2 text-center cursor-pointer"}  md:rounded-lg w-[15rem] h-[25rem] `}>
                  {
                    videoUrl?(
                      <>
                        <AiOutlineClose onClick={()=>handleCloseVideo()} className='absolute right-5 top-5 text-white font-bold text-[1.4rem] cursor-pointer'/>
                        <Video url={videoUrl} type="uploadVideo"/>
                      </>
                    ):(
                      <div className='flex flex-col m-auto justify-center items-center'>
                        <BsFillCloudUploadFill className='m-auto text-[2rem] text-gray-400'/>
                        <h1 className='text-[1.3rem] font-medium'>
                          Select video to upload
                        </h1>
                        <div className='mt-6 '>
                          <p className='text-gray-400 text-sm leading-10 font-medium'>
                            MP4 or WebM or ogg <br/>
                            Up to 10 minutes <br/>
                            Less than 2 GB
                          </p>
                        </div>
                        <input name="video" onChange={(e)=>handleOnChange(e)} hidden ref={inputVideoRef} type="file" accept="video/mp4, video/webm, video/ogg"/>
                      </div>
                    )
                  }
              </section>
              
              <section className='flex-grow '>
                <form action="" autoComplete='off' className='flex flex-col gap-5 py-5 md:py-10 md:px-10'>
                {alert.show && <Alert type={alert.type} message={alert.message}/>}
                  <Input value={form.caption} handleOnChange={handleOnChange} type="text" label="Caption"/>
                  <Dropdown dataCategory={form.category} handleOnChange={handleOnChange}  label={"Category"} dataCategories={categories}/>
                  <div className='flex gap-5 font-semimedium rounded-sm'>
                    <button onClick={(e)=>handleOnDiscard(e)} className='w-[8rem] py-1 rounded-[0.3rem] border-[0.005rem]'>Discard</button>
                    <button onClick={(e)=>handleOnSubmit(e)} className='w-[8rem] py-1 flex space-x-2 justify-center items-center bg-main rounded-[0.3rem] text-white'>
                      <span>
                        Post
                      </span>
                      {
                        loading &&<LoadingIcon size={"w-4"}/> 
                      }
                    </button>
                  </div>
                </form>
              </section>
            </article>

          </div>
      </div>
    </LayoutPage>
  )
}

export default UploadVideo

