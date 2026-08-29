'use client'
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa6"
import Swal from "sweetalert2";

const RemoveCart = ({id}) => {
    const router = useRouter()
    const handleRemoveCart = async() => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to remove this product from the cart",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Remove!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await fetch(`${process.env.LOCAL_URL || ""}/api/cart/${id}`, {
                    method: 'DELETE'
                })
                if (res.ok) {
                    router.refresh()
                    Swal.fire({
                        title: "Removed!",
                        text: "The product has been removed the cart.",
                        icon: "success"
                    });
                }
            }
        });
    }    
    return (
        <button onClick={handleRemoveCart} className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"><FaTrash></FaTrash></button>
    )
}

export default RemoveCart