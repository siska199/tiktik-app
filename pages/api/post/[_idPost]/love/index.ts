import { getToken } from 'next-auth/jwt';
import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import client from '../../../../../utils/sanityClient/sanity';

const secret = process.env.JWT_SECRET
export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method} = req
    const token = await getToken({req, secret})
    if(method=="POST"){
        try {
            const username = token?.name?.toLowerCase().split(' ').slice(0,2).join('')
            const {_idPost} = req.query
            const {body} = req
            let resLike 
            if(body.like != -1){
                resLike = await client.patch(_idPost).unset([`likes[${body.like}]`]).commit()
            }else{
                const doc = {
                    _ref : username,
                    _type : "reference"
                }
                resLike = await client.patch(_idPost)
                .setIfMissing({likes: []})
                .append('likes',[doc])
                .commit({autoGenerateArrayKeys:true})
            }
            res.status(200).send(resLike)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}