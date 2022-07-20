import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../utils/sanityClient/sanity';

const secret = process.env.JWT_SECRET
export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method} = req 
    const {_idPost} = req.query
    const token = await getToken({req,secret})
    if(method=="POST"){
        try {            
            const {body} = req
            const doc = {
                field :body.comment,
                createdAt : Date.now(),
                postBy :{
                    _ref :token?.id,
                    _type:"reference"
                }
            }   
            await client.patch(_idPost)
                                .setIfMissing({comments: []})
                                .append('comments',[doc])
                                .commit({autoGenerateArrayKeys:true})
            res.status(200).send("Add comment success")
        } catch (error) {
            res.status(500).send(error)
        }
    }
    
}