import { queryPostsPostedByUser, queryPostsBookmarkedByUser } from './../../../utils/sanityClient/queries';
import { getToken } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../utils/sanityClient/sanity";
import { queryPosts, queryPostsByCaption } from "../../../utils/sanityClient/queries";
import { secret } from '../../../utils/constanta';

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    const token = await getToken({req,secret})
    const {query:{topic="",_idUser="",type=""},method} = req
    
    if(method=="GET"){
        try {
            let query = topic ? queryPostsByCaption : queryPosts
            switch(type){
                case "category":
                    query = queryPostsByCaption
                    break;
                case "posted":
                    query = queryPostsPostedByUser
                    break;
                case "bookmarked":
                    query = queryPostsBookmarkedByUser
                    break;
                default:
                    query = queryPosts
                    break;
            }
            const params = {_idUser,topic}
            let dataPosts = await client.fetch(query, params)
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