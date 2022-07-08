import { BsCode, BsEmojiSunglasses } from 'react-icons/bs';
import { GiCakeSlice, GiGalaxy, GiLipstick } from 'react-icons/gi';
import { FaPaw, FaMedal, FaGamepad, } from 'react-icons/fa';
import {FcGoogle} from "react-icons/fc"
import { IconType } from 'react-icons';
interface dataTopics{
    title :string;
    icon : JSX.Element
}

export const dataTopics : Array<dataTopics> = [
    {
      title: 'Development',
      icon: <BsCode />,
    },
    {
      title: 'Comedy',
      icon: <BsEmojiSunglasses />,
    },
    {
      title: 'Gaming',
      icon: <FaGamepad />,
    },
    {
      title: 'Food',
      icon: <GiCakeSlice />,
    },
    {
      title: 'Dance',
      icon: <GiGalaxy />,
    },
    {
      title: 'Beauty',
      icon: <GiLipstick />,
    },
    {
      title: 'Animals',
      icon: <FaPaw />,
    },
    {
      title: 'Sports',
      icon: <FaMedal />,
    },
  ];


export const dataListsFooter = [
    ['About', 'Newsroom', 'Store', 'Contact', 'Carrers', 'ByteDance', 'Creator Directory'],
    [ 'TikTik for Good','Advertise','Developers','Transparency','TikTik Rewards' ],
    [ 'Help', 'Safety', 'Terms', 'Privacy', 'Creator Portal', 'Community Guidelines' ]
]

interface dataSuggestedAccounts{
  image : string;
  name : string;
  username : string
}
export const dataSuggestedAccounts :Array<dataSuggestedAccounts> = [
  ...Array(3)
].map((_,i)=>({
  image:`peoples/image${i}.jpg`,
  name:`Siska Apriana Rifianti _${i}`,
  username:`siska_199_${i}`
}))

interface dataPosts{
  image : string;
  name : string;
  username : string;
  caption : string;
  video : string;
}

export const dataPosts : Array<dataPosts> = [
  ...Array(10)
].map((_,i)=>({
  image:`peoples/image${i}.jpg`,
  name:`Siska Apriana Rifianti _${i}`,
  username:`siska_199_${i}`,
  caption : `caption_${i}`,
  video : `videos/video${i}.mp4`
}))

interface comments {
  username:string;
  image:string;
  comment : string;
} 
interface dataDetail {
  image: string;
  name: string;
  username:string;
  caption : string;
  comments : comments[];
  likes : number;
}

export const dataDetail = {
  image:`peoples/image0.jpg`,
  name:`Siska Apriana Rifianti _0`,
  username:`siska_199_0`,
  caption : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  video : `videos/video0.mp4`,
  comments : [
    ...Array(10)
  ].map((_,i)=>({
    username:`siska_199_${i}`,
    image:`peoples/image${i}.jpg`,
    comment : `comment_${i}`,
  })),
  likes : 50,
}


export const dataCategory : string[]= [
  "Development",
  "Comedy",
  "Gaming",
  "Food",
  "Dance",
  "Beauty",
  "Animals",
  "Sports"
]

interface dataUser {
  image: string;
  name: string;
  username:string;
}

export const dataUser : dataUser = {
  image:`peoples/image5.jpg`,
  name:`Siska Apriana Rifianti _0`,
  username:`siska_199_0`,
}
interface dataIconAuthProviders{
  icon : JSX.Element;
}

export const dataIconAuthProviders  :Array<dataIconAuthProviders> = [
  {
    icon : <FcGoogle/>,
  }
]