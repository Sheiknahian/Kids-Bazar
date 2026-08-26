import CartedList from "../components/CartedList"

const getCartedProducts = async() => {
    const res = await fetch('http://localhost:3000/api/cart').then(res=>res.json())
    return res
}

const CartedProducts = async() => {
    const products = await getCartedProducts()
    // console.log(products);
    return <CartedList products={products} ></CartedList>

}

export default CartedProducts