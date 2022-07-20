import { getToken } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../utils/sanityClient/sanity";
import { queryPosts, queryPostsByCaption } from "../../../utils/sanityClient/queries";

const secret = process.env.JWT_SECRET
export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    const {query:{topic},method} = req
    const token = await getToken({req,secret})
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
            const {body} = req
            const doc = {
                _type :"post",
                caption : body.caption,
                category :{
                    _ref:body.category._id,
                    _type:"reference"
                },
                postBy :{
                    _ref:token?.id,
                    _type:"reference"
                },
                video :{
                    _type:"file",
                    asset :{
                        _type:"reference",                    
                        _ref:body.video._id,
                    }
                }
            }
            await client.create(doc)
            res.status(201).send('Create Post Success')
        } catch (error) {
            res.status(500).send(`${error}`)
        }
    }
} 

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '100mb',
      },
    },
  }