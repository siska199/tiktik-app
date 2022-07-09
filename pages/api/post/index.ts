import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../utils/sanity";
import { queryPosts, queryPostsByCaption } from "../../../utils/queries";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    const {query:{topic},method} = req
    console.log("topic: ", topic)
    console.log("method: ", method)
    if(method=="GET"){
        try {
            const query = topic ? queryPostsByCaption : queryPosts
            const params = {username:"",topic: topic?topic:""}
            const posts = await client.fetch(query, params)
            res.status(200).json(posts)
        } catch (error) {
            res.status(500).send(`${error}`)
        }
    }

    if(method=="POST"){
        try {
            
        } catch (error) {
            res.status(500).send(`${error}`)
        }
    }
} 