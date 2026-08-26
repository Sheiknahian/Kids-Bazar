import { FaCartShopping } from "react-icons/fa6"
import Navlink from "../Navlink"

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-10 py-5 bg-base-200 border-b-2 border-primary">
      <div>
        <h2 className="text-4xl text-primary font-bold">Kids <span className="text-black">Bazar</span></h2>
      </div>
      <div className="flex gap-10">
        <Navlink href={'/'}>Home</Navlink>
        <Navlink href={'/products'}>Shop</Navlink>
        <Navlink href={'/about'}>About</Navlink>
        <Navlink href={'/contact'}>Contact</Navlink>
      </div>
      <div>
        <button className="btn btn-primary text-lg font-semibold rounded-xl px-7 py-6"><FaCartShopping></FaCartShopping> Cart</button>
      </div>
    </div>
  )
}

export default Navbar