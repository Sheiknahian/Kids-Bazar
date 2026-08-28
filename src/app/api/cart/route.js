import { dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"

export const cart = dbConnect('cart')


export async function DELETE(req) {
    const {searchParams} = new URL(req.url)
    const userId = searchParams.get('userId')
    console.log(userId);
    
    if (userId) {
        const result = await cart.deleteMany({userID: userId})
        return Response.json(result)
    }
}

