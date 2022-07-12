import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../utils/sanity";
import { queryPosts, queryPostsByCaption } from "../../../utils/queries";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    const {query:{topic},method} = req
    if(method=="GET"){
        try {
            const query = topic ? queryPostsByCaption : queryPosts
            const params = {username:"",topic: topic?topic:""}
            const dataPosts = await client.fetch(query, params)
            res.status(200).json(dataPosts)
        } catch (error) {
            res.status(500).send(`${error}`)
        }
    }

    if(method=="POST"){
        try {
            const {body}=req
            console.log("body: ", body)
            res.status(201).send('Create Post Success')
        } catch (error) {
            res.status(500).send(`${error}`)
        }
    }
} 

export const config = {
    api: {
      bodyParser: {
        bodyParser: false, 
        sizeLimit: '100mb' 
      },
    },
  }