import Reac from 'react'
import UserInfo from './UserInfo'
import Video from './Video';
interface Props {
  image : string;
  name : string;
  username : string;
  caption :string;
  video:{
    url:string;
    _id:string;
  },
  _idPost : string;
  bookmark : string;
}

const Post : React.FC<Props> = ({image, name, username, caption, video, _idPost, bookmark}) => {
  return (
    <section className='p-5  md:w-[80%] ml-auto  '>
      <UserInfo image={image} username={username} name={name} type="post" caption={caption}/>
      <div className=' w-[92%] h-[60vh] border bg-gray-200 sm:bg-white sm:border-none flex flex-col justify-center ml-auto my-5 '>
        <Video url={video.url} _idPost={_idPost} type="post"  bookmark={bookmark}/>
      </div>
    </section>
  )
}

export default Post