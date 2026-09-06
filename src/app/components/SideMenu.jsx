"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsShop } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoIosLogIn, IoIosLogOut, IoMdInformationCircleOutline } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import { MdMenu, MdClose, MdAppRegistration } from "react-icons/md";

const SideMenu = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname()
    const session = useSession()
    return (
        <>
            {/* Menu Button */}
            <MdMenu className="text-2xl text-primary" onClick={() => setOpen(true)}></MdMenu>

            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 h-screen w-72 bg-white p-5 shadow-xl transition-transform duration-300 ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                        Menu
                    </h2>

                    <button
                        onClick={() => setOpen(false)}
                        className="text-2xl text-primary"
                    >
                        <MdClose />
                    </button>
                </div>

                {/* Menu items */}
              {
                session?.data?.user
                ?
                <nav className="space-y-3">
                    <a href="/" className={`block p-3 flex gap-1 items-center hover:bg-gray-200 ${pathname === '/' ? 'bg-primary rounded-xl text-white font-semibold' : ''}`}>
                       <IoHomeOutline /> Home
                    </a>

                    <a href="/products" className={`block p-3 flex gap-1 items-center hover:bg-gray-200 ${pathname.startsWith('/products') ? 'bg-primary rounded-xl text-white font-semibold' : ''}`}>
                      <BsShop /> Products
                    </a>

                    <a href="/about" className={`block p-3 flex gap-1 items-center hover:bg-gray-200 ${pathname.startsWith('/about') ? 'bg-primary rounded-xl text-white font-semibold' : ''}`}>
                        <IoMdInformationCircleOutline /> About
                    </a>

                    <a href="/profile" className={`block p-3 flex gap-1 items-center hover:bg-gray-200 ${pathname === '/profile' ? 'bg-primary rounded-xl text-white font-semibold' : ''}`}>
                       <CgProfile /> Profile
                    </a>

                    <a href="/profile/orders" className={`block p-3 flex gap-1 items-center hover:bg-gray-200 ${pathname.startsWith('/profile/orders') ? 'bg-primary rounded-xl text-white font-semibold' : ''}`}>
                       <LuHistory /> My Orders
                    </a>

                    <a href="" onClick={signOut} className="block p-3 flex gap-1 items-center">
                      <IoIosLogOut /> Logout
                    </a>
                </nav>
                :
                <nav className="space-y-3">
                    <a href="/" className={`block p-3 flex gap-1 items-center hover:bg-gray-200 ${pathname === '/' ? 'bg-primary rounded-xl text-white font-semibold' : ''}`}>
                       <IoHomeOutline /> Home
                    </a>

                    <a href="/products" className={`block p-3 flex gap-1 items-center hover:bg-gray-200 ${pathname.startsWith('/products') ? 'bg-primary rounded-xl text-white font-semibold' : ''}`}>
                      <BsShop /> Products
                    </a>

                    <a href="/about" className={`block p-3 flex gap-1 items-center hover:bg-gray-200 ${pathname.startsWith('/about') ? 'bg-primary rounded-xl text-white font-semibold' : ''}`}>
                        <IoMdInformationCircleOutline /> About
                    </a>

                    <a href="/auth/login" className={`block p-3 flex gap-1 items-center hover:bg-gray-200 ${pathname.startsWith('/auth/login') ? 'bg-primary rounded-xl text-white font-semibold' : ''}`}>
                        <IoIosLogIn /> Login
                    </a>

                    <a href="/auth/register" className={`block p-3 flex gap-1 items-center hover:bg-gray-200 ${pathname.startsWith('/auth/register') ? 'bg-primary rounded-xl text-white font-semibold' : ''}`}>
                        <MdAppRegistration /> Register
                    </a>    
                </nav>
              }
            </aside>
        </>
    );
};

export default SideMenu;