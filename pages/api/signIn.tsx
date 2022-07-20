import { NextApiRequest, NextApiResponse } from "next"
import client from "../../utils/sanityClient/sanity"


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method} = req
    console.log("masok")
    if(method=="POST"){
        try {
            const {body} = req
            console.log("body get: ", body)
            const username = body.name.toLowerCase().split(' ').slice(0,2).join('')
            const doc = {
                _type : "user",
                _id : body.id,
                image:body.image,
                name:body.name,
                username : `${username}`
            }
            await client.createIfNotExists(doc)
            res.status(200).send('User Sign In Success')
        } catch (error) {
            res.status(500).send(error)   
        }
    }
}