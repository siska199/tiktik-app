import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import client from '../../../utils/sanityClient/sanity';
import { queryCategories } from '../../../utils/sanityClient/queries';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method} = req
    
    if(method=="GET"){
        try{
            const query = queryCategories;
            const params = {}
            const dataCategories = await client.fetch(query, params)
            res.status(200).send(dataCategories)
        }catch(error){
            res.status(500).send(error)
        }
    }
}