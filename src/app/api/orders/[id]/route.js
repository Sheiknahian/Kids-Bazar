import { ObjectId } from "mongodb"
import { orders } from "../route"

export async function GET(req, {params}) {
    const {id} = await params
    console.log('orderId', id);
    
    const result = await orders.findOne({_id: new ObjectId(id)})
    // console.log(result);
    
    return Response.json(result)
}