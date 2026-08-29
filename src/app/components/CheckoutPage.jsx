'use client'
import Image from "next/image"
import PaymentMethod from "./PaymentMethod"
import { useState } from "react"
import Swal from "sweetalert2"
import Link from "next/link"
import { useRouter } from "next/navigation"

const postOrderToDB = async(checkout, userId) => {
    console.log(checkout);
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL || "https://kids-bazar.vercel.app"}/api/orders`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(checkout)
    })
    if (res.ok && userId) {
        const result = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL || "https://kids-bazar.vercel.app"}/api/cart?userId=${userId}`, {
            method: 'DELETE'
        })
        return [result, res]
    }
    return [res]
}

const CheckoutPage = ({session, products, subtotal, singleBuy}) => {
    const router = useRouter()
    const [payment, setPayment] = useState('cod')
    console.log(process.env.NEXT_PUBLIC_LOCAL_URL);
    
    const handleOnSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())
        const checkout = {
            userId: session?.user?.id,
            customer: data,
            products: products,
            subtotal: subtotal,
            deliveryCharge: 60,
            total: subtotal + 60,
            paymentMethod: payment,
            paymentStatus: 'unpaid',
            createdAt: new Date()
        }
        console.log(checkout);

        if (payment === 'cod') {
            const orderConfirm = await postOrderToDB(checkout, !singleBuy && session?.user?.id)
            if (orderConfirm[0].ok) {
                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire({
                    icon: "success",
                    title: 'Order Confirmed!'
                });
            }
            // console.log(await orderConfirm[0].json());
            const result = await orderConfirm[0].json()
            const orderId = result.insertedId
            console.log(orderId);
            
            return router.push(`/successPage?orderId=${orderId}`)
        }
        
        // console.log(data);
        
    }

    
    return (
        <div className="min-h-screen bg-[#FFF4D6] px-6 py-10 md:px-10">
            <div className="mx-auto max-w-6xl">     
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Checkout
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Complete your order by providing your delivery information.
                    </p>
                </div>

                <form onSubmit={handleOnSubmit} className="grid gap-8 lg:grid-cols-[1fr_400px]">
                {/* Left - Customer Information */} 
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">
                        Delivery Information
                        </h2>

                        <div className="grid gap-5 md:grid-cols-2">
                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Full Name
                            </label>
                            <input
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Phone Number
                            </label>
                            <input
                            name="phone"
                            type="tel"
                            placeholder="01XXXXXXXXX"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        {/* Email */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Email Address
                            </label>
                            <input
                            defaultValue={session?.user?.email}
                            disabled
                            type="email"
                            placeholder="example@gmail.com"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Delivery Address
                            </label>
                            <textarea
                            name="address"
                            rows="4"
                            placeholder="House, Road, Area, City..."
                            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        </div>

                        {/* Payment */}
                        <PaymentMethod setPayment={setPayment} payment={payment}></PaymentMethod>
                    </div>
                {/* Right - Order Summary */}
                    <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">
                        Order Summary
                        </h2>

                        {/* Product */}
                        <div className="space-y-4">
                        {
                            products?.map((product, index) => 
                            {
                                const discount = (product.price - (product.price * product.discount / 100)) * product.quantity
                                return(<div key={index} className="flex items-center gap-4">
                                        <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-100">
                                        {/* Product Image */}
                                            <Image className="rounded-xl" alt={product.title} width={64} height={64} src={product.image}></Image>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                        <p className="truncate font-semibold text-gray-900">
                                            {product.title}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Qty: {product.quantity}
                                        </p>
                                        </div>

                                        <p className="font-semibold text-gray-900">
                                        {discount}
                                        </p>
                                    </div>
                                )
                            }
                        )
                        }
                        </div>

                        <div className="my-6 border-t border-gray-200" />

                        {/* Price */}
                        <div className="space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>৳{subtotal}</span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                            <span>Delivery Charge</span>
                            <span>৳60</span>
                        </div>

                        <div className="flex justify-between text-lg font-bold text-gray-900">
                            <span>Total</span>
                            <span>৳{subtotal + 60}</span>
                        </div>
                        </div>

                        <button type="submit" className="mt-6 w-full rounded-xl bg-primary py-3.5 font-bold text-white transition cursor-pointer hover:opacity-90">
                        Place Order →
                        </button>

                        <p className="mt-4 text-center text-xs text-gray-400">
                        By placing your order, you agree to our terms and conditions.
                        </p>
                    </div>
                </form>  
            </div>
        </div>
    )
}

export default CheckoutPage