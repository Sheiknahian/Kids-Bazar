'use client'
import Link from "next/link"
import { usePathname } from "next/navigation";

const Navlink = ({children, href}) => {
  const pathname = usePathname();

  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className="group relative text-lg font-semibold"
    >
      <span
        className={`transition-colors duration-300 ${
          isActive
            ? "text-primary"
            : "text-gray-700 group-hover:text-primary"
        }`}
      >
        {children}
      </span>

      {/* Animated underline */}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  )
}

export default Navlink