import { FaCartShopping } from "react-icons/fa6"
import Navlink from "../Navlink"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-10 py-5 bg-base-200 border-b-2 border-primary">
      <div>
        <h2 className="text-4xl text-primary font-bold">Kids <span className="text-black">Bazar</span></h2>
      </div>
      <div className="flex gap-10 text-black">
        <Navlink href={'/'}>Home</Navlink>
        <Navlink href={'/products'}>Shop</Navlink>
        <Navlink href={'/about'}>About</Navlink>
        <Navlink href={'/cartedProducts'}>Cart</Navlink>
        
      </div>
      <div className="flex gap-2">
        <Link href={'/login'}>
          <button className="btn bg-primary text-white border-primary text-lg font-semibold rounded-xl px-7 py-5 hover:bg-secondary">Login</button>
        </Link>
        <Link href={'/signup'}>
          <button className="btn bg-white border-primary text-lg font-semibold rounded-xl px-7 py-5 text-primary hover:bg-primary hover:text-white">Register</button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar