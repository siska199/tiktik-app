import type { NextPage } from 'next'
import {getProviders} from "next-auth/react"
import LayoutPage from '../layouts/LayoutPage'
import Post from "../components/Post"
import NotFound from '../components/NotFound'

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
  }[];
}

const Home: NextPage<PropsIndex> = ({providers, posts}) => {
  return (
    <LayoutPage type="homepage" providers={providers}>
      <div className='flex-[0.7] flex-col flex-grow py-5'>
        {
          posts?.length>0 ?(
            <>            
              {
                posts?.map((data,i)=>(
                  <Post _idPost={data._id} key={i} image={data.postBy.image} name={data.postBy.name} username={data.postBy.username} caption={data.caption} video={data.video}/>
                ))
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
    const {topic} = context.query
    const providers = await getProviders()
    const url = topic && topic !="all" ?`${process.env.NEXTAUTH_URL}/api/post?topic=${topic}`:`${process.env.NEXTAUTH_URL}/api/post`
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