import { stripe } from "@/lib/stripe";
import { orders } from "../orders/route";
import { ObjectId } from "mongodb";
export async function POST(req) {
    const {searchParams} = new URL(req.url)
    const orderId = searchParams.get('orderId')
    const singleBuy = searchParams.get('singleBuy')
    const order = await orders.findOne({_id: new ObjectId(orderId)})
    console.log('order', order);
    
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: order.products.map(item=>({
            price_data: {
                currency: 'bdt',
                product_data: {
                    name: item.title
                },
                unit_amount: Math.round(item.price - (item.price * item.discount / 100)) * 100
            },
            quantity: item.quantity
        })),
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/successPage?orderId=${orderId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
        metadata: {
            orderId: orderId,
            singleBuy: singleBuy,
            userId: order.userId
        }
    })
    // console.log(session.url);
    
    return Response.json({stripeUrl: session.url})
}