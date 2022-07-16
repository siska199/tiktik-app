import { getToken } from 'next-auth/jwt';
import type {NextApiResponse, NextApiRequest} from "next"
import { queryPostById } from "../../../../utils/sanityClient/queries"
import client from "../../../../utils/sanityClient/sanity"

const secret = process.env.JWT_SECRET
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method} = req
    const {_idPost} = req.query
    const token = await getToken({req, secret})
    const username = token?.name?.toLowerCase().split(' ').slice(0,2).join('')
    if(method=="GET"){
        try {
            const params = {id : _idPost, username:username?username:""}
            const query = queryPostById
            const resPostById = await client.fetch(query, params)
            const indexLike = resPostById.likes.findIndex(like=>like==username)

            console.log("index: ", indexLike)
            res.status(200).send({
                ...resPostById,
                like : indexLike
            })
        } catch (error) {
            res.status(500).send(`${error}`)
        }
    }

}