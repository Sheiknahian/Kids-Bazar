import RemoveCart from "../components/RemoveCart"

const getCartedProducts = async() => {
    const res = await fetch('http://localhost:3000/api/cart').then(res=>res.json())
    return res
}

const CartedProducts = async() => {
    const products = await getCartedProducts()
    // console.log(products);
    
    return (
        <div className="m-10 min-h-screen">
            <h2 className="text-primary text-4xl font-bold text-center">Carted <span className="text-black">Products</span></h2>
            <div className="mt-10 flex flex-col gap-5">
            {
                products.map((product, index) => {
                    const discountedPrice =
                    product.price - (product.price * product.discount) / 100;

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
                    <div className="flex shrink-0 items-center rounded-lg border border-gray-300">
                        <button className="px-3 py-2 text-lg hover:bg-gray-100">
                        −
                        </button>

                        <span className="min-w-10 text-center font-semibold">
                        1
                        </span>

                        <button className="px-3 py-2 text-lg hover:bg-gray-100">
                        +
                        </button>
                    </div>

                    {/* Total Price */}
                    <div className="w-28 shrink-0 text-right">
                        <p className="text-xs text-gray-400">Total</p>

                        <p className="mt-1 text-xl font-bold text-gray-900">
                        ৳{Math.round(discountedPrice)}
                        </p>
                    </div>
                        {/* Remove */}
                        <RemoveCart id={product._id}></RemoveCart>
                    </div>
                    );
                })
            }
            </div>
        </div>
    )
}

export default CartedProducts