import Image from "next/image"
import Link from "next/link"

const getDetails = async(id) => {
    
    const res = await fetch(`http://localhost:3000/api/products/${id}`).then(res=>res.json())
    return res
}

const Details = async({params}) => {
    const {id} = await params
    const product = await getDetails(id)
    console.log(product);

    const discountedPrice =
    product?.price - (product?.price * product?.discount) / 100;
    if (!product) {
        return
    }
    return (
        <main className="min-h-screen bg-base-200 py-10">
            <div className="mx-auto max-w-6xl px-4">

                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-neutral/60">
                <Link href="/" className="hover:text-primary">
                    Home
                </Link>

                <span className="mx-2">/</span>

                <Link href="/products" className="hover:text-primary">
                    Products
                </Link>

                <span className="mx-2">/</span>

                <span className="text-neutral">
                    {product.title}
                </span>
                </div>

                {/* Product */}
                <div className="grid overflow-hidden rounded-3xl bg-base-100 shadow-lg lg:grid-cols-2">

                {/* Image */}
                <div className="relative min-h-[400px] bg-base-200 lg:min-h-[600px]">
                    <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    priority
                    className="object-contain p-8"
                    />

                    <span className="absolute left-6 top-6 rounded-full bg-accent px-4 py-2 font-bold text-white">
                    -{product.discount}% OFF
                    </span>
                </div>

                {/* Details */}
                <div className="flex flex-col p-6 sm:p-10">

                    {/* Category */}
                    <span className="mb-3 w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    Educational Toy
                    </span>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-neutral sm:text-4xl">
                    {product.title}
                    </h1>

                    <p className="mt-2 text-lg text-neutral/60">
                    {product.bangla}
                    </p>

                    {/* Rating */}
                    <div className="mt-5 flex items-center gap-3">
                    <div className="text-lg text-accent">
                        ⭐ {product.ratings}
                    </div>

                    <span className="text-sm text-neutral/50">
                        {product.reviews} Reviews
                    </span>

                    <span className="text-sm text-neutral/50">
                        • {product.sold} Sold
                    </span>
                    </div>

                    {/* Price */}
                    <div className="mt-6 flex items-center gap-3">
                    <span className="text-4xl font-bold text-primary">
                        ৳{Math.round(discountedPrice)}
                    </span>

                    <span className="text-lg text-neutral/40 line-through">
                        ৳{product.price}
                    </span>
                    </div>

                    <p className="mt-1 text-sm text-success font-medium">
                    You save ৳{product.price - Math.round(discountedPrice)}
                    </p>

                    {/* Info */}
                    <div className="mt-7">
                    <h2 className="mb-3 text-lg font-bold text-neutral">
                        Why Kids Will Love It
                    </h2>

                    <ul className="space-y-2">
                        {product.info.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-2 text-neutral/70"
                        >
                            <span className="mt-1 text-success">✓</span>
                            {item}
                        </li>
                        ))}
                    </ul>
                    </div>

                    {/* Quantity */}
                    <div className="mt-7">
                    <p className="mb-2 font-semibold text-neutral">
                        Quantity
                    </p>

                    <div className="flex w-fit items-center overflow-hidden rounded-lg border border-base-300">
                        <button className="px-4 py-2 text-xl hover:bg-base-200">
                        −
                        </button>

                        <span className="border-x border-base-300 px-6 py-2">
                        1
                        </span>

                        <button className="px-4 py-2 text-xl hover:bg-base-200">
                        +
                        </button>
                    </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <button className="rounded-xl bg-primary py-4 font-bold text-white transition hover:bg-secondary">
                        Add to Cart
                    </button>

                    <button className="rounded-xl border-2 border-primary py-4 font-bold text-primary transition hover:bg-primary hover:text-white">
                        Buy Now
                    </button>
                    </div>

                </div>
                </div>

                {/* Description */}
                <section className="mt-8 rounded-3xl bg-base-100 p-6 shadow-md sm:p-10">
                <h2 className="mb-5 text-2xl font-bold text-neutral">
                    Product Description
                </h2>

                <div className="space-y-4 leading-7 text-neutral/70">
                    {product.description.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                    ))}
                </div>
                </section>

                {/* Q&A */}
                <section className="mt-8 rounded-3xl bg-base-100 p-6 shadow-md sm:p-10">
                <h2 className="mb-5 text-2xl font-bold text-neutral">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {product.qna.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-base-300 p-5"
                    >
                        <h3 className="font-bold text-neutral">
                        {item.question}
                        </h3>

                        <p className="mt-2 text-neutral/60">
                        {item.answer}
                        </p>
                    </div>
                    ))}
                </div>
                </section>

            </div>
        </main>
    )
}

export default Details