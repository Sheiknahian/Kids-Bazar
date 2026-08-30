import { stripe } from "@/lib/stripe"
import { orders } from "../../orders/route"
import { ObjectId } from "mongodb"
import { cart } from "../../cart/route";

export async function POST(req) {
    console.log("🔥 WEBHOOK HIT");
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")
    
    const event = stripe.webhooks.constructEvent(
        body, signature, process.env.STRIPE_WEBHOOK_SECRET
    )
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object
        // console.log(session);
        const {orderId, userId} = session.metadata
        const singleBuy = session.metadata.singleBuy === 'true'
        console.log('userId from listener', userId);
        
        await orders.updateOne({_id: new ObjectId(orderId)}, {$set: {paymentStatus: 'paid'}})
        console.log(singleBuy);
        
        if (!singleBuy) {
            const array = await cart.find({userID: userId}).toArray()
            console.log(array);
            await cart.deleteMany({userID: userId})
        }
    }
    return Response.json({ received: true });
}