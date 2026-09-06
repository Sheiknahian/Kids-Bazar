import { CgProfile } from "react-icons/cg"
import { IoCartOutline, IoSettingsOutline } from "react-icons/io5"
import { MdLogout } from "react-icons/md"
import Sidelink from "../components/Sidelink"

const ProfileLayout = ({children}) => {
  return (
    <div className="grid lg:grid-cols-7 min-h-screen">
        <aside className="border-r-2 hidden lg:block border-primary bg-base-200">
            <h3 className="p-4 font-semibold text-gray-600">Menu</h3>
            <div className="text-lg font-semibold flex flex-col">
                <Sidelink href={''}><CgProfile />Profile</Sidelink>
                <Sidelink href={'orders'}><IoCartOutline />My orders</Sidelink>
                <Sidelink href={'settings'}><IoSettingsOutline />Settings</Sidelink>
                <Sidelink href={'logout'}><MdLogout />Logout</Sidelink>
            </div>
        </aside>
        <div className="col-span-6">
            {children}
        </div>
    </div>
  )
}

export default ProfileLayout