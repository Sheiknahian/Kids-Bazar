
import { getServerSession } from "next-auth"
import { getCartedProducts } from "../cartedProducts/page"
import CheckoutPage from "../components/CheckoutPage"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getDetails } from "../products/[id]/page"

const Checkout = async({searchParams}) => {
    const session = await getServerSession(authOptions)
    const {productId, quantity} = await searchParams   
    if (!productId) {
        const products = await getCartedProducts(session?.user?.id)
        const subtotal = products.reduce((total, product) => {
            const discountedPrice =
                product.price - (product.price * product.discount) / 100;
            return total + discountedPrice * product.quantity;
        }, 0);
        return (<CheckoutPage session={session} products={products} subtotal={subtotal}></CheckoutPage>)
    }

    const product = await getDetails(productId)
    product.quantity = quantity
    const discountedPrice = product.price - (product.price * product.discount) / 100;
    const subtotal = discountedPrice * quantity;
    return (
        <CheckoutPage session={session} products={[product]} subtotal={subtotal} singleBuy={true}></CheckoutPage>
    )
}

export default Checkout