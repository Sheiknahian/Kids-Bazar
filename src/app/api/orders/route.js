import { dbConnect } from "@/lib/dbConnect"

export const orders = dbConnect('orders')

export async function POST(req) {
    const order = await req.json()
    const result = await orders.insertOne(order)
    console.log(result);
    
    return Response.json(result)
}

export async function GET(req) {
    const {searchParams} = new URL(req.url)
    const userId = searchParams.get('userId')
    const userOrders = await orders.find({userId: userId}).toArray()
    return Response.json(userOrders)
}