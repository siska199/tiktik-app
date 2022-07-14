import { NextApiRequest, NextApiResponse } from "next"
import client from "../../utils/sanity"


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method} = req
    
    if(method=="POST"){
        try {
            const {body} = req
            const doc = {
                _type : "user",
                _id : body.name.toLowerCase().split(' ').slice(0,2).join(''),
                image:body.image,
                name:body.name,
                username : body.name.toLowerCase().split(' ').slice(0,2).join('')
            }
            await client.createIfNotExists(doc)
            res.status(200).send('User Sign In Success')
        } catch (error) {
            res.status(500).send(error)   
        }
    }
}