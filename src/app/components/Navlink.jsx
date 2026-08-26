import Link from "next/link"

const Navlink = ({children, href}) => {
  return (
    <Link href={href} className="text-lg font-semibold hover:text-primary">{children}</Link>
  )
}

export default Navlink