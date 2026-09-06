import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { products } from "@/app/api/products/route"
import { getServerSession } from "next-auth"
import Image from "next/image"

const getOrders = async(userId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL || "https://kids-bazar.vercel.app"}/api/orders?userId=${userId}`).then(res => res.json())
  return res
}
const Orders = async() => {
  const session = await getServerSession(authOptions)
  const orders = await getOrders(session?.user?.id)
  // console.log(orders);
  
  return (
    <div className="bg-[#FFF4D6] p-4 md:p-6 lg:p-10 min-h-screen">
      <h2 className="text-primary text-4xl font-bold text-center">My <span className="text-black">Orders: </span>{orders.length}</h2>
      <div className="mt-4 md:mt-6 lg:mt-10 space-y-5">
      {
        orders?.map((order, index) => 
        <div key={index} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="py-5 flex flex-col gap-5">

            {
              order?.products?.map((product, i) => {
                const discountPrice = product.price - product.discount * product.price / 100
                return(
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-100">
                      <Image 
                        src={product.image}
                        alt="Product"
                        width={64}
                        height={64}
                        className="rounded-xl"></Image>
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {product.title}
                      </h4>

                      <p className="mt-1 text-sm text-gray-400">
                        Quantity: {product.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-gray-800">
                      ৳{discountPrice}
                    </p>

                  </div>
                )
              })
            }
            
          </div>


          <div className="flex items-center justify-between border-t border-gray-100 pt-4">

            <div>
              <p className="text-xs text-gray-400">
                Total Amount
              </p>

              <p className="text-xl font-bold text-gray-900">
                ৳{order.total}
              </p>
            </div>

            <button className="rounded-xl border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
              View Details
            </button>

          </div>

        </div>)
      }
      </div>
      

    </div>
  )
}

export default Orders