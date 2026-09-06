import Link from "next/link"

const Sidelink = ({children, href}) => {
  return (
    <Link href={`/profile/${href}`}>
        <button className="w-full text-start py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-300 flex items-center gap-1">{children}</button>
    </Link>
  )
}

export default Sidelink