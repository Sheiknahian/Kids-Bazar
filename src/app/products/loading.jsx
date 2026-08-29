const loading = () => {
  return (
    <div className="p-10 bg-[#FFF4D6]">
        <h2 className="text-primary text-4xl font-bold text-center">All <span className="text-black">Products</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-2xl border border-gray-200 p-4 animate-pulse"
                >
                    <div className="h-48 w-full rounded-xl bg-gray-200"></div>

                    <div className="mt-4 h-5 w-3/4 rounded bg-gray-200"></div>

                    <div className="mt-3 h-4 w-1/2 rounded bg-gray-200"></div>

                    <div className="mt-4 h-10 w-full rounded-lg bg-gray-200"></div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default loading