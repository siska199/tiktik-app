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
            const _idUser = token? token.id : ""
            const {_idPost} = req.query
            const {body} = req
            let resLike 
            if(body.likeKeyUser){
                resLike = await client.patch(_idPost).unset([`likes[_key=="${body.likeKeyUser}"]`]).commit()
            }else{
                const doc = {
                    _ref : _idUser,
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