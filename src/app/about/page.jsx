const About = () => {
    const features = [ { icon: "🧸", title: "Product Catalog", description: "বাচ্চাদের জন্য toys, learning products এবং accessories-এর সুন্দর collection খুঁজে নিন।", },
        {icon: "🛒", title: "Easy Shopping Cart", description: "পছন্দের products সহজেই cart-এ add করুন এবং আপনার shopping এক জায়গা থেকে manage করুন।", }, 
        {icon: "💳", title: "Easy Checkout", description: "সহজ ও convenient checkout experience-এর মাধ্যমে দ্রুত order complete করুন।", }, 
        {icon: "📦", title: "Order Tracking", description: "আপনার order এবং delivery status সহজেই monitor করুন।", }, 
        {icon: "👤", title: "User Accounts", description: "নিজের account তৈরি করে order history এবং shopping preferences সহজে manage করুন।", }, 
        {icon: "⭐", title: "Product Reviews", description: "অন্য customers-এর feedback দেখুন এবং নিজের shopping experience share করুন।", }, 
    ];
  return (
    <main className="min-h-screen bg-[#FFF4D6] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <section className="text-center">
          <span className="inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-orange-500 shadow-sm">
            🧸 Welcome to Kids Bazar
          </span>

          <h1 className="mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Fun Shopping for
            <span className="block text-orange-500">
              Little Ones
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Kids Bazar is a single-vendor e-commerce platform made for
            discovering fun, creative and engaging products for children.
          </p>
        </section>

        {/* About */}
        <section className="mt-20 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-semibold uppercase tracking-widest text-orange-500">
              About Us
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              More than just a toy store.
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Kids Bazar is designed to make shopping for children's toys,
              accessories and learning products simple, enjoyable and
              convenient.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              From discovering a new favorite toy to completing an order,
              everything is designed to provide parents and families with a
              smooth shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-3xl">🧸</div>
              <h3 className="mt-3 font-bold text-gray-900">Fun Products</h3>
              <p className="mt-1 text-sm text-gray-500">
                Toys made for little smiles.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-3xl">🎨</div>
              <h3 className="mt-3 font-bold text-gray-900">
                Creative Choices
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Discover something new.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-3xl">📦</div>
              <h3 className="mt-3 font-bold text-gray-900">Easy Orders</h3>
              <p className="mt-1 text-sm text-gray-500">
                Simple shopping experience.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-3xl">⭐</div>
              <h3 className="mt-3 font-bold text-gray-900">
                Customer Reviews
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Your feedback matters.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-20">
          <div className="text-center">
            <p className="font-semibold uppercase tracking-widest text-orange-500">
              What We Offer
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need for easy shopping
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-3xl">{feature.icon}</div>

                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 rounded-3xl bg-orange-500 px-6 py-12 text-center text-white">
          <div className="text-4xl">🎁 🧸 🎨</div>

          <h2 className="mt-4 text-3xl font-bold">
            Let the fun begin!
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-orange-100">
            Discover fun and exciting products for your little ones at
            Kids Bazar.
          </p>
        </section>
      </div>
    </main>
  )
}

export default About