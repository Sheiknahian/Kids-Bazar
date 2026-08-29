import { dbConnect } from "@/lib/dbConnect"

export const orders = dbConnect('orders')

export async function POST(req) {
    const order = await req.json()
    const result = await orders.insertOne(order)
    console.log(result);
    
    return Response.json(result)
}
