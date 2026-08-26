import { dbConnect } from "@/lib/dbConnect"

export const products = dbConnect('products')

export async function POST(req) {
    const body = await req.json()
    const result = await products.insertMany(body)
    return Response.json(result)
}

export async function GET(req) {
    const result = await products.find().toArray()
    return Response.json(result)
}