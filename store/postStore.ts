import create from "zustand"
import { persist } from "zustand/middleware"

const postStore = (set:any)=>({
    modalDetailPost : false,
    handleModalDetailPost : ()=>set((state:any)=>({modalDetailPost: !state.modalDetailPost}))
})

const usePostStore = create(persist(postStore,{
    name : "post"
}))

export default usePostStore