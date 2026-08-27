'use client'

import { signIn } from "next-auth/react"

const Login = () => {

   const handleOnSubmit = async(e) => {
      e.preventDefault()
      const email = e.target.email.value
      const password = e.target.pass.value

      const result = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false
      })

      console.log(result);
      
      if (result.ok) {
        window.location.href = '/'
      }

   }

  return (
    <div className="flex  justify-center bg-[#FFF4D6] px-4 pt-28 pb-45">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Login with Kids Bazar
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Join Kids Bazar and start shopping today
          </p>
        </div>

        {/* Google */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-5 w-5"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l5.7-5.7C34.3 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.6 16.1 18.9 12 24 12c3.1 0 5.9 1.1 8.1 2.9l5.7-5.7C34.3 6.5 29.4 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.6 35.1 26.9 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.2v5.3C9.5 39.7 16.2 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4 5.6l6.2 5.2C37.1 39.3 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
            />
          </svg>

          Continue with Google
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-sm text-gray-400">
            OR
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email
            </label>

            <input
              required
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              required
              type="password"
              name="pass"
              placeholder="Create a password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Login */}
          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3.5 font-bold text-white transition hover:opacity-90"
          >
            Login
          </button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Do not have an account?{" "}
          <a
            href="/auth/register"
            className="font-semibold text-primary hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login