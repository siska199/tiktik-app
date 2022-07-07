import type { NextPage } from 'next'
import LayoutPage from '../layouts/LayoutPage'
import Post from "../components/Post"
import { dataPosts } from '../utils/data'

const Home: NextPage = () => {
  return (
    <LayoutPage type="homepage">
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
