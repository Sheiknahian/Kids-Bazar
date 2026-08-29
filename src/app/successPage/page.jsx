
import Link from "next/link";
import Image from "next/image";

const getOrder = async(orderId) => {
    console.log(orderId);
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL || "https://kids-bazar.vercel.app"}/api/orders/${orderId}`).then(res => res.json())
    return res
}

const OrderSuccess = async({ searchParams }) => {
    const {orderId} = await searchParams
    // console.log(orderId);
    
    const order = await getOrder(orderId)
    return (
        <div className="min-h-screen bg-[#FFF4D6] px-6 py-10 md:px-10">
        <div className="mx-auto max-w-5xl">

            {/* Success Header */}
            <div className="mb-8 rounded-3xl bg-white p-8 text-center shadow-sm border border-gray-200">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <span className="text-4xl text-green-600">✓</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Order Confirmed!
            </h1>

            <p className="mt-3 text-gray-500">
                Thank you for your order. We&apos;ve received your order successfully.
            </p>

            {orderId && (
                <p className="mt-4 text-sm text-gray-500">
                Order ID:{" "}
                <span className="font-semibold text-gray-900">
                    {orderId}
                </span>
                </p>
            )}
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

            {/* Left */}
            <div className="space-y-8">

                {/* Ordered Products */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                    Ordered Products
                </h2>

                <div className="space-y-5">
                    {order?.products?.map((product, index) => (
                    <div
                        key={product.productId || index}
                        className="flex items-center gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0"
                    >
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                        />
                        </div>

                        <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-gray-900">
                            {product.title}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Qty: {product.quantity}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            ৳{product.price - (product.price * product.discount / 100)}
                        </p>
                        </div>

                        <p className="font-bold text-gray-900">
                        ৳{(product.price - (product.price * product.discount / 100)) * Number(product.quantity)}
                        </p>
                    </div>
                    ))}
                </div>
                </div>

                {/* Delivery Information */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                    Delivery Information
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="mt-1 font-semibold text-gray-900">
                        {order?.customer?.name}
                    </p>
                    </div>

                    <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="mt-1 font-semibold text-gray-900">
                        {order?.customer?.phone}
                    </p>
                    </div>

                    <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="mt-1 font-semibold text-gray-900">
                        {order?.customer?.email}
                    </p>
                    </div>

                    <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p className="mt-1 font-semibold text-gray-900">
                        {order?.customer?.city}
                    </p>
                    </div>

                    <div className="sm:col-span-2">
                    <p className="text-sm text-gray-500">Delivery Address</p>
                    <p className="mt-1 font-semibold text-gray-900">
                        {order?.customer?.address}
                    </p>
                    </div>
                </div>
                </div>
            </div>

            {/* Right - Summary */}
            <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Order Summary
                </h2>

                <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>৳{order?.subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                    <span>Delivery Charge</span>
                    <span>৳{order?.deliveryCharge}</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>৳{order?.total}</span>
                    </div>
                </div>
                </div>

                {/* Payment */}
                <div className="mt-6 rounded-xl bg-gray-50 p-4">
                <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                    Payment Method
                    </span>

                    <span className="text-sm font-semibold uppercase text-gray-900">
                    {order?.paymentMethod}
                    </span>
                </div>

                <div className="mt-3 flex justify-between">
                    <span className="text-sm text-gray-500">
                    Payment Status
                    </span>

                    <span className="text-sm font-semibold capitalize text-orange-500">
                    {order?.paymentStatus}
                    </span>
                </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 space-y-3">
                <Link
                    href="/orders"
                    className="block w-full rounded-xl bg-primary py-3.5 text-center font-bold text-white transition hover:opacity-90"
                >
                    View My Orders
                </Link>

                <Link
                    href="/"
                    className="block w-full rounded-xl border-2 border-primary py-3.5 text-center font-bold text-primary transition hover:bg-primary hover:text-white"
                >
                    Continue Shopping
                </Link>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default OrderSuccess;