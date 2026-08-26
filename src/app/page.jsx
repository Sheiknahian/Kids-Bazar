import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-[#FFF4D6] px-6 py-30 sm:px-10 lg:px-16">
      {/* Decorative shapes */}
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#FFD166]/40 blur-2xl" />
      <div className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-[#A8DADC]/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        {/* Left Content */}
        <div className="max-w-xl">
          <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-orange-500 shadow-sm">
            🎈 Fun • Learn • Explore
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Little Toys,
            <br />
            <span className="text-orange-500">Big Imagination!</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
            শিশুদের জন্য মজার, creative এবং educational toys খুঁজে নিন।
            Play করতে করতে শেখার জন্য Kids Bazar-এ রয়েছে দারুণ সব collection।
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Shop Now →
            </Link>

          </div>

          {/* Trust Info */}
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
            <div>
              <span className="font-bold text-gray-900">1000+</span>
              <br />
              Happy Kids
            </div>

            <div>
              <span className="font-bold text-gray-900">500+</span>
              <br />
              Toys
            </div>

            <div>
              <span className="font-bold text-gray-900">4.8 ⭐</span>
              <br />
              Customer Rating
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute inset-5 rounded-full bg-orange-300/30 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] bg-white p-4 shadow-2xl">
            <Image
              src="https://i.ibb.co.com/vxMYHV6V/image.png"
              alt="Kids toys"
              width={700}
              height={600}
              priority
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>

          {/* Floating card */}
          <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white px-5 py-4 shadow-xl sm:left-0">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-100 text-xl">
                🧸
              </div>

              <div>
                <p className="text-xs text-gray-500">Kids Favorite</p>
                <p className="font-bold text-gray-900">
                  Fun Learning Toys
                </p>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -right-2 top-8 rotate-6 rounded-xl bg-red-500 px-4 py-2 font-bold text-white shadow-lg sm:right-0">
            Up to 30% OFF 🎉
          </div>
        </div>
      </div>
    </section>
  );
}
