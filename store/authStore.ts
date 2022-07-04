import creat from "zustand"
import {persist} from "zustand/middleware"


const authStore = (set:any)=>({
    userProfile : null,
    addUser : (user:any)=>set({userProfile:user})
    
})

const useAuthStore = creat(persist(authStore,{
    name : 'auth'
}))

export default useAuthStore