'use client'

import { signOut } from "next-auth/react"

const Logout = () => {
  return (
    <button onClick={() => signOut()} className="text-lg font-semibold px-7 py-2 text-primary hover:text-secondary cursor-pointer">Logout</button>
  )
}

export default Logout