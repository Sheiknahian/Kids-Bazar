import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const users = dbConnect('users')

export async function POST(req) {
    const body = await req.json()
    const exist = await users.findOne({email: body.email})
    if (exist) {
        return
    }
    const hashedPassword = await bcrypt.hash(body.password, 10)  
    const user = {
        username: body.name,
        email: body.email,
        hashedPassword: hashedPassword,
        role: 'User',
        createdAt: new Date()
    }
    const result = await users.insertOne(user)
    return Response.json(result)
}