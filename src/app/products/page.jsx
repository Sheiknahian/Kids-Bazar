import Image from "next/image"
import CartButton from "../components/CartButton"
import Link from "next/link"

const getProducts = async() => {
  const res = await fetch('http://localhost:3000/api/products').then(res=>res.json())
  return res
}

const Products = async() => {
  const products = await getProducts()
  
  return (
    <div className="m-10">
      <h2 className="text-primary text-4xl font-bold text-center">All <span className="text-black">Products</span></h2>
      <div className="grid grid-cols-4 gap-10 mt-10">
      {
        products?.map((product, index) => {
          const discountedPrice =
          product.price - (product.price * product.discount) / 100;

          return (
            <div key={index} className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-base-200">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Discount */}
                {product.discount > 0 && (
                  <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-sm font-bold text-white">
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">

                <h2 className="line-clamp-1 text-lg font-bold text-neutral">
                  {product.title}
                </h2>

                <p className="mt-1 line-clamp-1 text-sm text-neutral/60">
                  {product.bangla}
                </p>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="text-sm text-accent">
                    ⭐ {product.ratings}
                  </div>

                  <span className="text-xs text-neutral/50">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">
                    ৳{Math.round(discountedPrice)}
                  </span>

                  {product.discount > 0 && (
                    <span className="text-sm text-neutral/40 line-through">
                      ৳{product.price}
                    </span>
                  )}
                </div>

                {/* Sold */}
                <p className="mt-1 text-xs text-neutral/50">
                  {product.sold} sold
                </p>

                <div className="flex gap-2">
                  {/* Button */}
                  <CartButton product={product}></CartButton>
                  <Link href={`/products/${product._id}`} className="mt-4 w-full rounded-xl bg-white border-2 border-primary py-3 font-semibold 
                    text-primary transition-colors hover:bg-primary hover:text-white cursor-pointer text-center">
                      View Details
                  </Link>
                </div>

              </div>
            </div>
          );
        })
      }
      </div>
    </div>
  )
}

export default Products