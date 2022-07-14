import type {NextApiResponse, NextApiRequest} from "next"
import { queryPostById } from "../../../utils/sanityClient/queries"
import client from "../../../utils/sanityClient/sanity"

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method} = req
    const {_id} = req.query
    console.log("_id: ", _id)

    if(method=="GET"){
        try {
            const params = {id : _id, username:""}
            const query = queryPostById
            const resPostById = await client.fetch(query, params)
            console.log("post by id: ", resPostById)
            res.status(200).send(resPostById)
        } catch (error) {
            res.status(500).send(`${error}`)
        }
    }

}