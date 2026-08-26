'use client'

import Swal from "sweetalert2";

const CartButton = ({product}) => {
    const handleCarts = async() => {
        console.log(product);
        const cartProduct = {
            title: product.title,
            bangla: product.bangla,
            image: product.image,
            price: product.price,
            discount: product.discount,
            productId: product._id,
            quantity: 1,
        };
        const res = await fetch(`http://localhost:3000/api/cart/${product._id}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(cartProduct)
        })

        const data = await res.json()
        console.log(data);
        
        if (res.ok) {
            if (data.status === 409) {
                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire({
                    icon: "success",
                    title: data.message
                });
            }
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire({
                icon: "success",
                title: data.message
            });
        }
    }
    return (
        <button onClick={handleCarts} className="mt-4 w-full rounded-xl bg-primary py-3 font-semibold text-white transition-colors hover:bg-secondary cursor-pointer">Add to Cart</button>
    )
}

export default CartButton