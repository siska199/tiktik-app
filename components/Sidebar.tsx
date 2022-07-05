import {AiFillHome} from "react-icons/ai"
import TitleSectionSideNavbar from "./TitleSectionSideNavbar"
import { dataTopics,dataSuggestedAccounts  } from "../utils/data"
import Topic from "./Topic"
import UserInfo from "./UserInfo"
import Footer from "./Footer"

const Sidebar = () => {
  return (
    <section className="sticky top-[3.5rem] flex flex-col flex-[0.1] md:flex-[0.3] max-h-[calc(100vh-3.5rem)] overflow-y-scroll">
      <div className="hidden md:flex md:p-5 md:border-b-[0.05rem] text-main space-x-3 items-center justify-center md:justify-start">
        <AiFillHome className="text-[1.2rem]"/>
        <h1 className="hidden md:block font-medium">For You</h1>
      </div>

      <div className="md:p-3 border-b-[0.05rem]">
        <TitleSectionSideNavbar title="Popular Topics"/>
        <div className="flex flex-col md:flex-row flex-wrap gap-[1.5rem] md:gap-[0.4rem] my-3">
          {
            dataTopics.map((data,i)=>(
              <Topic key={i} title={data.title} icon={data.icon} />
            ))
          }
        </div>
      </div>
      
      <div className="p-3 border-b-[0.05rem] hidden md:block">
        <TitleSectionSideNavbar title="Suggested Accounts"/>
        <div className="flex flex-col gap-[0.4rem] my-3">
          {
            dataSuggestedAccounts.map((data,i)=>(
              <UserInfo key={i} type="suggested" image={data.image} name={data.name} username={data.username} />
            ))
          }
        </div>
      </div>
      <Footer/>
    </section>
  )
}

export default Sidebar