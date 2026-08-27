import { getServerSession } from "next-auth"
import CartedList from "../components/CartedList"
import { authOptions } from "../api/auth/[...nextauth]/route"

const getCartedProducts = async(userId) => {
    const res = await fetch(`http://localhost:3000/api/cart/${userId}`).then(res=>res.json())
    return res
}

const CartedProducts = async() => {
    const session = await getServerSession(authOptions)
    const products = await getCartedProducts(session?.user.id)
    // console.log(products);
    return <CartedList products={products} ></CartedList>

}

export default CartedProducts