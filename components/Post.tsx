import React, {useState} from 'react'
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
}

const Post : React.FC<Props> = ({image, name, username, caption, video, _idPost}) => {
  return (
    <section className='p-5  md:w-[80%] ml-auto '>
      <UserInfo image={image} username={username} name={name} type="post" caption={caption}/>
      <div className='border-[0.005rem] w-[92%] ml-auto my-5'>
        <Video url={video.url} _idPost={_idPost} type="post" />
      </div>
    </section>
  )
}

export default Post