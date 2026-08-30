'use client'
import { useState } from "react"
import Quantity from "./Quantity"
import CartButton from "./CartButton"
import Link from "next/link"

const ProductAction = ({product}) => {
    const [count, setCountt] = useState(1)
    
    return (
        <div>
            <div className="mt-7">
                <Quantity setCountt={setCountt}></Quantity>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <CartButton product={product} count={count}>
                    Add to Cart
                </CartButton>
                <Link href={`/checkout?productId=${product._id}&quantity=${count}&singleBuy=${true}`}>
                    <button className="mt-4 w-full rounded-xl bg-white border-2 border-primary py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white cursor-pointer">
                        Buy Now
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ProductAction