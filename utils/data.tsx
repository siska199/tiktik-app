import { BsCode, BsEmojiSunglasses } from 'react-icons/bs';
import { GiCakeSlice, GiGalaxy, GiLipstick } from 'react-icons/gi';
import { FaPaw, FaMedal, FaGamepad } from 'react-icons/fa';

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