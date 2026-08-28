'use client'
import { useState } from "react";
import Quantity from "./Quantity";
import RemoveCart from "./RemoveCart";
import Link from "next/link";

const CartedList = ({products}) => {
    const [cartCount, setCartCount] = useState({})

    const handleQuantity = async(id, count) => {
        setCartCount((prev) => ({
            ...prev,
            [id]: count,
        }));        

        await fetch(`/api/cart/${id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: count }),
        });
    }

    

    const subtotal = products.reduce((total, product) => {
        const discountedPrice =
            product.price - (product.price * product.discount) / 100;

        const count = cartCount[product._id] || product.quantity;

        return total + discountedPrice * count;
    }, 0);


    // const subtotal = products.reduce((total, product) => {
    // const discountedPrice =
    //     product.price - (product.price * product.discount) / 100;

    // return total + discountedPrice * product.quantity;
    // }, 0);

    const deliveryCharge = 60;
    const total = subtotal + (products.length !== 0 ? deliveryCharge : 0);
    
    return (
        <div className="p-10 min-h-screen bg-[#FFF4D6]">
            <h2 className="text-primary text-4xl font-bold text-center">Carted <span className="text-black">Products</span></h2>
            <div className="mt-10 grid grid-cols-2 gap-10">
                <div className="flex flex-col gap-5">
                    <div className="bg-white py-5 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-primary text-3xl font-bold text-center">Products <span className="text-black">: {products?.length}</span></h2>
                    </div>
                {
                    products.map((product, index) => {
                        const discountedPrice =
                        product.price - (product.price * product.discount) / 100;
                        // const [totalPrice, setTotalPrice] = useState(discountedPrice)

                        const quantity = cartCount[product._id] || product.quantity;
                        const totalPrice = discountedPrice * quantity;
                        
                        // console.log(totalPrice, quantity);
                        
                        
                        

                        return (
                        <div key={index} className="flex w-full items-center gap-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                        {/* Product Image */}
                        <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                            <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="min-w-0 flex-1">
                            <h2 className="truncate text-lg font-bold text-gray-900">
                            {product.bangla}
                            </h2>

                            <p className="mt-1 truncate text-sm text-gray-500">
                            {product.title}
                            </p>

                            <div className="mt-3 flex items-center gap-3">
                            <span className="text-lg font-bold text-gray-900">
                                ৳{Math.round(discountedPrice)}
                            </span>

                            {product.discount > 0 && (
                                <>
                                <span className="text-sm text-gray-400 line-through">
                                    ৳{product.price}
                                </span>

                                <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-500">
                                    {product.discount}% OFF
                                </span>
                                </>
                            )}
                            </div>

                            <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
                            <span>⭐ {product.ratings}</span>
                            <span>•</span>
                            <span>{product.sold} sold</span>
                            </div>
                        </div>

                        {/* Quantity */}
                        <Quantity handleQuantity={(count) => handleQuantity(product._id, count)} quantity={quantity}></Quantity>

                        {/* Total Price */}
                        <div className="w-28 shrink-0 text-right">
                            <p className="text-xs text-gray-400">Total</p>

                            <p className="mt-1 text-xl font-bold text-gray-900">
                            ৳{Math.round(totalPrice)}
                            </p>
                        </div>
                            {/* Remove */}
                            <RemoveCart id={product._id}></RemoveCart>
                        </div>
                        );
                    })
                }
                </div>
                <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-xl font-bold text-gray-900">
                        Order Summary
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                                Product
                            </th>

                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">
                                Qty
                            </th>

                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                                Unit Price
                            </th>

                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                                Total
                            </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {products.map((product) => {
                            const discountedPrice =
                                product.price -
                                (product.price * product.discount) / 100;
                            return (
                                <tr key={product._id}>
                                <td className="px-6 py-4">
                                    <p className="font-medium text-gray-900">
                                    {product.bangla}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                    {product.title}
                                    </p>
                                </td>

                                <td className="px-6 py-4 text-center text-gray-700">
                                    {cartCount[product._id] || product.quantity}
                                </td>

                                <td className="px-6 py-4 text-right text-gray-700">
                                    ৳{Math.round(discountedPrice)}
                                </td>

                                <td className="px-6 py-4 text-right font-semibold text-gray-900">
                                    ৳{Math.round(
                                    discountedPrice * (cartCount[product._id] || 1)
                                    )}
                                </td>
                                </tr>
                            );
                            })}
                        </tbody>

                        <tfoot className="border-t border-gray-200">
                            <tr>
                            <td
                                colSpan="3"
                                className="px-6 py-3 text-right text-gray-600"
                            >
                                Subtotal
                            </td>

                            <td className="px-6 py-3 text-right font-semibold">
                                ৳{Math.round(subtotal)}
                            </td>
                            </tr>

                            <tr>
                            {products.length !== 0 && 
                            <>
                            <td
                                colSpan="3"
                                className="px-6 py-3 text-right text-gray-600"
                            >
                                Delivery
                            </td>

                            <td className="px-6 py-3 text-right font-semibold">
                                ৳60
                            </td>
                            </>
                            }
                            </tr>

                            <tr className="bg-gray-50">
                            <td
                                colSpan="3"
                                className="px-6 py-4 text-right text-lg font-bold text-gray-900"
                            >
                                Total
                            </td>

                            <td className="px-6 py-4 text-right text-xl font-bold text-orange-500">
                                ৳{Math.round(total)}
                            </td>
                            </tr>
                        </tfoot>
                        </table>
                    </div>

                    <div className="p-6">
                        <Link href={'/checkout'}>
                            <button className="w-full rounded-xl bg-orange-500 py-3.5 font-semibold text-white transition hover:bg-orange-600">
                            Proceed to Checkout →
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartedList