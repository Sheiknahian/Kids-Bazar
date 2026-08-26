import { dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"

export const cart = dbConnect('cart')

export async function POST(req) {
    const cartProduct = await req.json()
    console.log('Server', cartProduct._id);
    
    const exist = await cart.findOne({_id: cartProduct._id})
    if (exist) {
        console.log('Exist')
        return Response.json({message: 'This product already added to the cart', status: 409})
    }
    const result = await cart.insertOne(cartProduct)
    return Response.json({result, message: 'Cart added successfully', status: 201})
}