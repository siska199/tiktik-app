import type {NextApiResponse, NextApiRequest} from "next"


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method} = req
    const {_id} = req.query
    console.log("_id: ", _id)

    if(method=="GET"){
        try {
            
        } catch (error) {
            res.status(500).send(`${error}`)
        }
    }

}