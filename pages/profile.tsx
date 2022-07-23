import React, {useEffect, useState} from 'react'
import UserInfo from '../components/UserInfo'
import Video from '../components/Video'
import LayoutPage from '../layouts/LayoutPage'
import { dataUser,dataCategoriesProfile, dataLikedProfile,dataVideosProfile  } from '../utils/data'

const profile = () => {
  const [active, setActive] = useState("Videos")
  const [videos,setVideos] = useState<any[]>([])

  useEffect(()=>{
    active=="Videos"?setVideos(dataVideosProfile):setVideos(dataLikedProfile)
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
                    videos.map((data,i)=>(
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

export default profile