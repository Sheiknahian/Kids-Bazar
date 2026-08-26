import { dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"

export const cart = dbConnect('cart')


export async function GET(req) {
    const result = await cart.find().toArray()
    return Response.json(result)
}

