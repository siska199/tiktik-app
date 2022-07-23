import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import { secret } from '../../../../../utils/constanta';
import client from '../../../../../utils/sanityClient/sanity';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const token = await getToken({req,secret})
    const _idUser = token ? token.id : ""
    const {_idPost} = req.query
    const {method} = req
    console.log("masokkk bookmark")
    if(method=="POST"){
        try {
            const {body} = req
            console.log("req body for bookmark: ", body)
            const doc = {
                _ref : _idUser,
                _type : "reference"
            }
            let resBookmark 
            if(body.bookmarkKeyUser){
                resBookmark = await client.patch(_idPost).unset([`bookmarks[_key=="${body.bookmarkKeyUser}"]`]).commit()
            }else{
              resBookmark =  await client.patch(_idPost)
                            .setIfMissing({bookmarks:[]})
                            .append('bookmarks',[doc])
                            .commit({autoGenerateArrayKeys:true})
            }

            res.status(201).send(resBookmark)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}