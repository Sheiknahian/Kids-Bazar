import { FaCartShopping } from "react-icons/fa6"
import Navlink from "../Navlink"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Logout from "../Logout"
import Image from "next/image"

const Navbar = async() => {
  const session = await getServerSession(authOptions)
  return (
    <div className="flex justify-between items-center px-10 py-5 bg-base-200 border-b-2 border-primary">
      <div>
        <h2 className="text-4xl text-primary font-bold">Kids <span className="text-black">Bazar</span></h2>
      </div>
      
        <div className="flex gap-12 text-black">
          <Navlink href={'/'}>Home</Navlink>
          <Navlink href={'/products'}>Shop</Navlink>

          {session && <Navlink href={'/cartedProducts'}>Cart</Navlink>}
          
          <Navlink href={'/about'}>About</Navlink>
        </div>
      {
        !session ?
        <div className="flex gap-2">
          <Link href={'/auth/login'}>
            <button className="btn bg-primary text-white border-primary text-lg font-semibold rounded-xl px-7 py-5 hover:bg-secondary">Login</button>
          </Link>
          <Link href={'/auth/register'}>
            <button className="btn border-2 bg-white border-primary text-lg font-semibold rounded-xl px-7 py-5 text-primary hover:bg-primary hover:text-white">Register</button>
          </Link>
        </div>
        :
        <div className="flex items-center gap-2 rounded-full border-2 border-primary bg-white px-3 py-1.5 shadow-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-full font-bold text-white">
            <Image className="rounded-full" width={36} height={36} alt={session?.user?.name} src={session?.user?.image}></Image>
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">
              {session?.user?.name}
            </p>

            <p className="text-xs text-gray-500">
              My Profile
            </p>
          </div>
          <Logout></Logout>
        </div>
      }
    </div>
  )
}

export default Navbar