import { NextApiRequest, NextApiResponse } from "next"
import client from "../../utils/sanityClient/sanity"


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method} = req
    if(method=="POST"){
        try {
            const {body} = req
            const username = body.name.toLowerCase().split(' ').slice(0,2).join('')
            const doc = {
                _type : "user",
                _id : body.name.id,
                image:body.image,
                name:body.name,
                username : `${username}199`
            }
            const resCreateUser = await client.createIfNotExists(doc)
            console.log("res create user :", resCreateUser)
            res.status(200).send('User Sign In Success')
        } catch (error) {
            res.status(500).send(error)   
        }
    }
}