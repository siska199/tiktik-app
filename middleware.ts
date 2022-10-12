import { NextResponse, NextRequest } from "next/server";
import {getToken} from "next-auth/jwt"
import { secret } from "./utils/constanta";

export async function middleware(req:NextRequest){
    try {
        const {pathname} = req.nextUrl
        const authPages = [
            "/profile",
            "/upload-video"
        ]
        
        if(authPages.includes(pathname)){
            const userData = await getToken({
                req,
                secret,
            })
            const url = req.nextUrl.clone()
            url.pathname = "/"
            if(!userData) return NextResponse.redirect(url)
        }
    } catch (error) {
        throw error
    }

}