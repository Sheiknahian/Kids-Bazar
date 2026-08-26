import { ObjectId } from "mongodb";
import { products } from "../route";

export async function GET(req, {params}) {
    const {id} = await params;
    // console.log(id);
    
    const result = await products.findOne({_id: new ObjectId(id)})
    // console.log(result);
    
    return Response.json(result)
}