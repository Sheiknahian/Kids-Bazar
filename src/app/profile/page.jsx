import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

const Profile = async() => {
  const session = await getServerSession(authOptions)
  return (
    <div className="rounded-2xl border border-gray-200 bg-[#FFF4D6] p-4 md:p-6 lg:p-10 min-h-screen shadow-sm">

      {/* Profile Header */}
      <div className="flex items-center gap-5 border-b border-gray-100 pb-6">
        
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
          N
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {session?.user?.name}
          </h2>

          <p className="text-sm text-gray-500">
            {session?.user?.email}
          </p>

          <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Customer
          </span>
        </div>

      </div>


      {/* Personal Information */}
      <div className="mt-6">

        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            Personal Information
          </h3>

          <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Edit
          </button>
        </div>


        <div className="grid gap-5 sm:grid-cols-2 rounded-xl bg-gray-50 p-4">

          <div>
            <p className="text-xs font-medium text-gray-400">
              Full Name
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {session?.user?.name}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-400">
              Email
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {session?.user?.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-400">
              Phone
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {session?.user?.username || '01XXXXXXXXX'}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-400">
              Member Since
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {session?.user?.createdAt || 'September 2026'}
            </p>
          </div>

        </div>

      </div>


      {/* Address */}
      <div className="mt-8 border-t border-gray-100 pt-6">

        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            Default Address
          </h3>

          <button className="text-sm font-semibold text-primary hover:underline">
            Change
          </button>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            Sheikh Nahian
          </p>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            House 12, Road 5, Dhaka, Bangladesh
          </p>

          <p className="mt-1 text-sm text-gray-500">
            01XXXXXXXXX
          </p>
        </div>

      </div>

    </div>
  )
}

export default Profile