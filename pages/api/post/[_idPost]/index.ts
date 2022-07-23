import { getToken } from 'next-auth/jwt';
import type {NextApiResponse, NextApiRequest} from "next"
import { queryPostById } from "../../../../utils/sanityClient/queries"
import client from "../../../../utils/sanityClient/sanity"
import { secret } from '../../../../utils/constanta';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const token = await getToken({req, secret})
    const _idUser = token? token.id:""
    const {_idPost} = req.query
    const {method} = req
    if(method=="GET"){
        try {
            const params = {_idPost,_idUser}
            const query = queryPostById
            const resPostById = await client.fetch(query, params)

            res.status(200).send(resPostById)
        } catch (error) {
            res.status(500).send(`${error}`)
        }
    }

}