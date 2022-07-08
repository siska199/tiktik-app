import type { NextPage } from 'next'
import {getProviders} from "next-auth/react"

import LayoutPage from '../layouts/LayoutPage'
import Post from "../components/Post"
import { dataPosts } from '../utils/data'

interface PropsIndex{
  providers : object;
}

const Home: NextPage<PropsIndex> = ({providers}) => {
  console.log("providers homepage: ", providers)
  return (
    <LayoutPage type="homepage" providers={providers}>
      <div className='flex-[0.7] flex-col flex-grow py-5'>
        {
          dataPosts.map((data,i)=>(
            <Post key={i} image={data.image} name={data.name} username={data.username} caption={data.caption} video={data.video}/>
          ))
        }
      </div>
    </LayoutPage>
  )
}

export default Home

export const getServerSideProps = async()=>{
  try {
    const providers = await getProviders()
    console.log("providers: ",providers)
    return{
      props :{
        providers
      }
    }
  } catch (error) {
    throw error
  }
}