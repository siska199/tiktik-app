import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import { secret } from '../../../../../utils/constanta';
import client from '../../../../../utils/sanityClient/sanity';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const token = await getToken({req,secret})
    const _idUser = token ? token.id : ""
    const {_idPost} = req.query
    const {method} = req


    if(method=="POST"){
        try {
            const {body} = req
            const doc = {
                _ref : _idUser,
                _type : "reference"
            }
            let resBookmark 
            if(body.bookmark)

            await client.patch(_idPost)
                        .setIfMissing({bookmarks:[]})
                        .append('bookmarks',[doc])
                        .commit({autoGenerateArrayKeys:true})
            res.status(201).send('Add bookmark success')
        } catch (error) {
            res.status(500).send(error)
        }
    }
}