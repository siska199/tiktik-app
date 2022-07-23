import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../utils/sanityClient/sanity';
import { secret } from '../../../../../utils/constanta';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const token = await getToken({req,secret})
    const _idUser = token ? token.id : ""
    const {_idPost} = req.query
    const {method} = req 
    if(method=="POST"){
        try {            
            const {body} = req
            const doc = {
                field :body.comment,
                createdAt : Date.now(),
                postBy :{
                    _ref :_idUser,
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