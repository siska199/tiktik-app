import { signIn } from 'next-auth/react'
import React from 'react'
import { useSelector } from 'react-redux'
import {RootState} from "../redux/store"

const Auth = () => {
    const providers = useSelector((state:RootState)=>state.auth.providers)

  return (
    <div className='border'>
        {
            Object.keys(providers).map((provider:any) =>(
                <button key={provider.id} onClick={()=>signIn(provider.id)}>
                    {provider.name}
                </button>
            ))
        }
    </div>
  )
}

export default Auth