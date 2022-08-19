import { GetServerSideProps } from 'next'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingPage from '../components/LoadingPage'
import UserInfo from '../components/UserInfo'
import Video from '../components/Video'
import LayoutPage from '../layouts/LayoutPage'
import { handleGetPosts, handleLoadingPost } from '../redux/actions/postActions'
import {dataCategoriesProfile, } from '../utils/data'
import { userURL } from '../utils/url'
import {RootState} from "../redux/store"
import NotFound from '../components/NotFound'

interface PropsIndex {
  userData : {
    image : string
    username : string
    name : string
  }
}

interface Post {
  bookmark : string
  _id : string
  video : {
    url :string

  }
}

const Profile:NextPage<PropsIndex>= ({userData}) => {
  const router = useRouter()
  const {user:_idUser} = router.query
  const dispatch = useDispatch()
  const posts:any = useSelector<RootState>(state=>state.post.posts)
  const loadingPost= useSelector<RootState>(state=>state.post.loadingPost)
  const [active, setActive] = useState("Videos")

  useEffect(()=>{
    const data = {
      type : active=="Videos"?"posted":"bookmarked",
      _idUser
    }
    dispatch(handleLoadingPost(true))
    dispatch(handleGetPosts(data)).then(()=>{
      dispatch(handleLoadingPost(false))
    })    
  },[active])

  return (
    <LayoutPage type="profile">
        <div className='flex-[0.7] flex gap-10 flex-col flex-grow py-5 px-[3.5rem]'>
            <section>
              <UserInfo image={userData?.image} username={userData?.username} name={userData?.name} type="profile" />
            </section>

            <section>
              <ul className='flex gap-8 border-b-[0.005rem] font-semibold'>
                {
                  dataCategoriesProfile.map((data,i)=>(
                    <li key={i} onClick={()=>setActive(data.name)} className={`${active==data.name&&"border-main border-b-2 text-gray-400 transition duration-[50] ease-linear"} cursor-pointer` }>{data.name}</li>
                  ))
                }
              </ul>
              <div className='my-4 flex flex-col gap-10'>
                {
                  loadingPost?(
                    <LoadingPage/>
                  ):(
                    <>
                      {
                        posts.length>0 ? (
                          posts.map((data:Post,i:number)=>(
                            <div key={i} className="md:w-[90%]">
                              <Video bookmark={data.bookmark} url={data.video.url} _idPost={data._id} type="profile"/>
                            </div>
                          ))
                        ):(
                          <NotFound type="video"/>
                        )
                      }
                    </>
                  )
                }
              </div>
            </section>
        </div>
    </LayoutPage>
  )
}

export const getServerSideProps : GetServerSideProps = async(contex)=>{
  try {
    const {user : _idUser} = contex.query
    const userData = await fetch(`${userURL}/${_idUser}`).then(res=>res.json())
    return({
      props :{
        userData
      }
    })
  } catch (error) {
    throw error
  }
}

export default Profile

