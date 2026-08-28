import { ObjectId } from "mongodb"
import { cart } from "../route"

export async function GET(req, {params}) {
    const {id} = await params
    console.log(id);
    
    const result = await cart.find({userID: id}).toArray()
    return Response.json(result)
}

export async function DELETE(req, {params}) {
    const {id} = await params
    const {searchParams} = new URL(req.url)
    const userId = searchParams.get('userId')
    console.log(userId);
    
    if (userId) {
        const result = await cart.deleteMany({userID: new ObjectId(userId)})
        return Response.json(result)
    }
    if (id) {
        const result = await cart.deleteOne({_id: new ObjectId(id)})
        return Response.json(result)
    }
}

export async function POST(req, {params}) {

    const cartProduct = await req.json()
    const {id} = await params

    const productId = id.split('_')[0]
    const userId = id.split('_')[1]

    console.log('Product', cartProduct);
    console.log('Id', id);
    
    const exist = await cart.findOne({productId: productId, userID: userId})
    if (exist) {
        console.log('Exist')
        return Response.json({message: 'This product already added to the cart', status: 409})
    }
    const result = await cart.insertOne(cartProduct)
    return Response.json({result, message: 'Cart added successfully', status: 201})
}

export async function PATCH(req, { params }) {
  const { id } = await params;
  const { quantity } = await req.json();

  const result = await cart.updateOne(
    { _id: new ObjectId(id) },
    { $set: { quantity } }
  );

  return Response.json(result);
}