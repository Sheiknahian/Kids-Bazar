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
        <div className="p-4 md:p-6 lg:p-10 min-h-screen bg-[#FFF4D6]">
            <h2 className="text-primary text-4xl font-bold text-center">Carted <span className="text-black">Products</span></h2>
            <div className="mt-4 md:mt-6 lg:mt-10 grid grid-cols-1 xl:grid-cols-2 gap-10">
                <div className="flex flex-col gap-5">
                    <div className="bg-white py-5 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-primary text-2xl xl:text-3xl font-bold text-center">Items <span className="text-black">: {products?.length}</span></h2>
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
                       <div
                            key={index}
                            className="flex w-full flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md sm:p-4 md:flex-row md:flex-wrap md:items-center md:gap-4 xl:flex-nowrap xl:gap-5"
                            >
                            {/* Product Image + Info */}
                            <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                                
                                {/* Product Image */}
                                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28 md:h-28 md:w-28 xl:h-32 xl:w-32">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-full w-full object-cover"
                                />
                                </div>

                                {/* Product Info */}
                                <div className="min-w-0 flex-1">
                                <h2 className="truncate text-base font-bold text-gray-900 sm:text-lg">
                                    {product.bangla}
                                </h2>

                                <p className="mt-1 truncate text-xs text-gray-500 sm:text-sm">
                                    {product.title}
                                </p>

                                <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-3 sm:gap-3">
                                    <span className="text-base font-bold text-gray-900 sm:text-lg">
                                    ৳{Math.round(discountedPrice)}
                                    </span>

                                    {product.discount > 0 && (
                                    <>
                                        <span className="text-xs text-gray-400 line-through sm:text-sm">
                                        ৳{product.price}
                                        </span>

                                        <span className="rounded-md bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-500 sm:text-xs">
                                        {product.discount}% OFF
                                        </span>
                                    </>
                                    )}
                                </div>

                                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 sm:gap-3 sm:text-sm">
                                    <span>⭐ {product.ratings}</span>
                                    <span>•</span>
                                    <span>{product.sold} sold</span>
                                </div>
                                </div>
                            </div>

                            {/* Bottom Actions */}
                            <div className="flex items-center justify-between border-t border-gray-100 pt-3 md:w-full md:border-t md:pt-3 xl:w-auto xl:border-0 xl:pt-0">
                                
                                {/* Quantity */}
                                <Quantity
                                handleQuantity={(count) =>
                                    handleQuantity(product._id, count)
                                }
                                quantity={quantity}
                                />

                                {/* Total Price */}
                                <div className="text-right md:ml-auto xl:w-28 xl:shrink-0">
                                <p className="text-xs text-gray-400">Total</p>

                                <p className="mt-1 text-lg font-bold text-gray-900 sm:text-xl">
                                    ৳{Math.round(totalPrice)}
                                </p>
                                </div>

                                {/* Remove */}
                                <div className="ml-3">
                                <RemoveCart id={product._id} />
                                </div>
                            </div>
                        </div>
                        );
                    })
                }
                </div>
                <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    <div className="border-b border-gray-200 px-4 py-3 sm:px-5 sm:py-4 xl:px-6">
                        <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Order Summary
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                            <th className="px-2 md:px-4 py-3 text-xs font-semibold text-gray-600 sm:px-6 sm:text-sm">
                                Product
                            </th>

                            <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 sm:px-6 sm:text-sm">
                                Qty
                            </th>

                            <th className="px-3 py-3 text-right text-xs font-semibold text-gray-600 sm:px-6 sm:text-sm">
                                Unit Price
                            </th>

                            <th className="px-2 md:px-4 py-3 text-right text-xs font-semibold text-gray-600 sm:px-6 sm:text-sm">
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
                                <td className="px-2 md:px-6 py-4">
                                    <p className="font-medium text-sm md:text-normal text-gray-900">
                                    {product.bangla}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                    {product.title}
                                    </p>
                                </td>

                                <td className="px-2 md:px-6 py-4 text-center text-gray-700">
                                    {cartCount[product._id] || product.quantity}
                                </td>

                                <td className="px-2 md:px-6 py-4 text-right text-sm md:text-normal text-gray-700">
                                    ৳{Math.round(discountedPrice)}
                                </td>

                                <td className="px-2 md:px-6 py-4 text-right text-sm md:text-normal font-semibold text-gray-900">
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
                                className="px-2 md:px-4 py-3 text-right text-sm text-gray-600 sm:px-6"
                            >
                                Subtotal
                            </td>

                            <td className="px-2 md:px-4 py-3 text-right text-sm font-semibold sm:px-6">
                                ৳{Math.round(subtotal)}
                            </td>
                            </tr>

                            <tr>
                            {products.length !== 0 && (
                                <>
                                <td
                                    colSpan="3"
                                    className="px-2 md:px-4 py-3 text-right text-sm text-gray-600 sm:px-6"
                                >
                                    Delivery
                                </td>

                                <td className="px-2 md:px-4 py-3 text-right text-sm font-semibold sm:px-6">
                                    ৳60
                                </td>
                                </>
                            )}
                            </tr>

                            <tr className="bg-gray-50">
                            <td
                                colSpan="3"
                                className="px-2 md:px-4 py-4 text-right text-base font-bold text-gray-900 sm:px-6 sm:text-lg"
                            >
                                Total
                            </td>

                            <td className="px-2 md:px-4 py-4 text-right text-lg font-bold text-orange-500 sm:px-6 sm:text-xl">
                                ৳{Math.round(total)}
                            </td>
                            </tr>
                        </tfoot>
                        </table>
                    </div>

                    <div className="p-4 sm:p-5 xl:p-6"> 
                        { products.length < 1 ? 
                        <button disabled className="w-full rounded-xl bg-orange-500 py-3.5 font-semibold text-white transition hover:bg-orange-600"> Proceed to Checkout → </button> 
                        : 
                        <Link href={'/checkout'}> 
                            <button className="w-full cursor-pointer rounded-xl bg-orange-500 py-3.5 font-semibold text-white transition hover:bg-orange-600"> Proceed to Checkout → </button> 
                        </Link> } 
                    </div> 

                </div>
            </div>
        </div>
    )
}

export default CartedList

