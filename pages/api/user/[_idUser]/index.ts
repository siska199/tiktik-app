import { queryUserById } from './../../../../utils/sanityClient/queries';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../utils/sanityClient/sanity';

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    const {method} = req
    const {_idUser=""} = req.query
    console.log("idUser mosok: ", _idUser)
    if(method=="GET"){
        try {
            const query = queryUserById
            const params = {_idUser}
            const dataProfile = await client.fetch(query, params)
            res.status(200).json(dataProfile)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}