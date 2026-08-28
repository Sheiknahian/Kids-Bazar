
import { getServerSession } from "next-auth"
import { getCartedProducts } from "../cartedProducts/page"
import CheckoutPage from "../components/CheckoutPage"
import { authOptions } from "../api/auth/[...nextauth]/route"

const Checkout = async() => {
    const session = await getServerSession(authOptions)
    const products = await getCartedProducts(session?.user?.id)

    // console.log(products);
    const subtotal = products.reduce((total, product) => {
        const discountedPrice =
            product.price - (product.price * product.discount) / 100;
        return total + discountedPrice * product.quantity;
    }, 0);

    
    
    return (
        <CheckoutPage session={session} products={products} subtotal={subtotal}></CheckoutPage>
    )
}

export default Checkout