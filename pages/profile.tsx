import React from 'react'
import UserInfo from '../components/UserInfo'
import LayoutPage from '../layouts/LayoutPage'
import { dataUser } from '../utils/data'
const profile = () => {
  return (
    <LayoutPage type="profile">
        <div className='flex-[0.7] flex-col flex-grow py-5 px-[3.5rem]'>
            <section>
              <UserInfo image={dataUser.image} username={dataUser.username} name={dataUser.name} type="profile" />
            </section>

            <section>

            </section>
        </div>
    </LayoutPage>
  )
}

export default profile