import { ObjectId } from "mongodb"
import { cart } from "../route"

export async function DELETE(req, {params}) {
    const {id} = await params
    console.log(id);
    
    const result = await cart.deleteOne({_id: new ObjectId(id)})
    return Response.json(result)
}

export async function POST(req, {params}) {

    const cartProduct = await req.json()
    const {id} = await params

    console.log('Product', cartProduct);
    console.log('Id', id);
    
    const exist = await cart.findOne({productId: id})
    if (exist) {
        console.log('Exist')
        return Response.json({message: 'This product already added to the cart', status: 409})
    }
    const result = await cart.insertOne(cartProduct)
    return Response.json({result, message: 'Cart added successfully', status: 201})
}