import {useSelector} from "react-redux"
import type { NextPage } from 'next'
import {getProviders} from "next-auth/react"
import LayoutPage from '../layouts/LayoutPage'
import Post from "../components/Post"
import NotFound from '../components/NotFound'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { handleGetProviders } from '../redux/actions/authAction'
import {postsURL} from "../utils/url"
import { getToken } from "next-auth/jwt"
interface PropsIndex{
  providers : object;
  posts : {
    postBy: {
      image : string;
      username:string;
      name:string;
    },
    caption:string;
    video:{
      url:string;
      _id:string;
    },
    _id : string;
    bookmark : string;
  }[];
}

const Home: NextPage<PropsIndex> = ({providers, posts}) => {
  console.log(providers)
  const dispatch = useDispatch()
  const modalDetail = useSelector((state:any)=> state.post.modalDetail)

  useEffect(()=>{
    dispatch(handleGetProviders(providers))
  },[])

  return (
    <LayoutPage type="homepage" providers={providers}>
      <div className={`${modalDetail&&""} flex-[0.7] flex-col flex-grow py-5`}>
        {
          posts?.length>0 ?(
            <>            
              {
                posts?.map((data,i)=>(
                  <Post key={i} _idPost={data._id} image={data.postBy.image} name={data.postBy.name} username={data.postBy.username} caption={data.caption} video={data.video} bookmark={data.bookmark}/>
                )
                )
              }
            </>
          ):(
            <NotFound type="video" />
          )
        }
      </div>
    </LayoutPage>
  )
}

export default Home

export const getServerSideProps = async(context:any)=>{
  try {
    const token = await getToken({req:context.req, secret: process.env.JWT_SECRET})
    const {topic} = context.query
    const providers = await getProviders()
    const url = topic && topic !="all" ?`${postsURL}?type=category&&topic=${topic}&&_idUser=${token?.id}`: `${postsURL}?_idUser=${token?.id}`
    const posts = await fetch(url).then(res=>res.json())
    return{
      props :{
        providers,
        posts
      }
    }
  } catch (error) {
    throw error
  }
}