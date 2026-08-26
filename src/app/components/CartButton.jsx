'use client'

import Swal from "sweetalert2";

const CartButton = ({product}) => {
    const handleCarts = async() => {
        console.log(product);
        const res = await fetch('http://localhost:3000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(product)
        })

        const data = await res.json()
        console.log(data);
        
        if (res.ok) {
            if (data.status === 409) {
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
                    title: data.message
                });
            }
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
                title: data.message
            });
        }
    }
    return (
        <button onClick={handleCarts} className="mt-4 w-full rounded-xl bg-primary py-3 font-semibold text-white transition-colors hover:bg-secondary cursor-pointer">Add to Cart</button>
    )
}

export default CartButton