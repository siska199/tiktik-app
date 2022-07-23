import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserInfo from '../components/UserInfo'
import Video from '../components/Video'
import LayoutPage from '../layouts/LayoutPage'
import { handleGetPosts } from '../redux/actions/postActions'
import { dataUser,dataCategoriesProfile, dataLikedProfile,dataVideosProfile  } from '../utils/data'
import { userURL } from '../utils/url'

const profile = () => {
  const router = useRouter()
  const {user:_idUser} = router.query
  const dispatch = useDispatch()
  const posts = useSelector(state=>state.post.posts)
  const [active, setActive] = useState("Videos")
  console.log("data posts masuk di ui: ", posts)
  useEffect(()=>{
    const data = {
      type : active=="Videos"?"posted":"bookmarked",
      _idUser
    }
    console.log("data we eill send: ", data)
    dispatch(handleGetPosts(data))    
  },[active])

  return (
    <LayoutPage type="profile">
        <div className='flex-[0.7] flex gap-10 flex-col flex-grow py-5 px-[3.5rem]'>
            <section>
              <UserInfo image={dataUser.image} username={dataUser.username} name={dataUser.name} type="profile" />
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
                    posts.map((data,i)=>(
                      <div key={i} className="md:w-[90%]">
                        <Video bookmark={""} url={data.video} type="profile"/>
                      </div>
                    ))
                  }
              </div>
            </section>
        </div>
    </LayoutPage>
  )
}

export const getServerSideProps = async(contex)=>{
  try {
    const {user : _idUser} = contex.query
    const profileData = await fetch(`${userURL}/${_idUser}`).then(res=>res.json())
    console.log("profileData.get: ", profileData)
    return({
      props :{

      }
    })
  } catch (error) {
    throw error
  }
}

export default profile

