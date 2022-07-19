import { signIn } from 'next-auth/react'
import React from 'react'
import { useSelector } from 'react-redux'

const Auth = () => {
    const providers = useSelector(state=>state.auth.providers)
    console.log("masuk di modal providers: ", providers)

  return (
    <div className='border'>
        {
            Object.keys(providers).map(provider=>(
                <button key={provider.id} onClick={()=>signIn(provider.id)}>
                    {provider.name}
                </button>
            ))
        }
    </div>
  )
}

export default Auth