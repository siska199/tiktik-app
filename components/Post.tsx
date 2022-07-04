import React from 'react'
import UserInfo from './UserInfo'
import Video from './Video';

interface Props {
  image : string;
  name : string;
  username : string;
  caption :string;
  video:string;
}

const Post : React.FC<Props> = ({image, name, username, caption, video}) => {
  return (
    <section className='p-5  md:w-[80%] ml-auto '>
      <UserInfo image={image} username={username} name={name} type="post" caption={caption}/>
      <div className='border-[0.005rem] w-[92%] ml-auto my-5'>
        <Video url={video}/>
      </div>
    </section>
  )
}

export default Post