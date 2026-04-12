function Features() {
  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-8 py-12 bg-[#E0F7FA] rounded-xl mb-8 mt-8">
        <div className="grid place-items-center text-center gap-6">
          <h3 className="text-3xl font-bold text-gray-800">About PaddleJoy</h3>
          <p className="text-gray-700 text-lg max-w-3xl">
            PaddleJoy brings water adventures to everyone. Our mission is to make
            kayaking and paddleboarding accessible, exciting, and safe for all skill
            levels. Explore lakes, rivers, and coastlines with confidence and comfort.
          </p>
        </div>
      </section>

      <section
        id="features"
        className="w-full max-w-7xl mx-auto px-8 py-12 bg-[#E0F7FA] rounded-xl mb-8"
      >
        <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Why Rent with PaddleJoy?
        </h3>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h4 className="text-xl font-semibold mb-2">Top-Quality Gear</h4>
            <p className="text-gray-600">
              Regularly maintained, reliable, and beginner-friendly equipment.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2">Affordable Pricing</h4>
            <p className="text-gray-600">
              Adventure should be accessible — our rentals fit every budget.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2">Safety First</h4>
            <p className="text-gray-600">
              Life jackets, tutorials, and guidance to keep you confident on the water.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-8 py-12 mb-8 bg-[#B2EBF2] rounded-xl">
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Popular Routes & Adventures
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-4 hover:shadow-2xl transition text-center">
            <h4 className="text-xl font-semibold mb-2 text-gray-800">
              Serene Lake Paddle
            </h4>
            <p className="text-gray-600">
              Perfect for beginners, enjoy calm waters and scenic views.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-4 hover:shadow-2xl transition text-center">
            <h4 className="text-xl font-semibold mb-2 text-gray-800">
              River Rapids Adventure
            </h4>
            <p className="text-gray-600">
              Feel the thrill on gentle rapids with our guided tours.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-4 hover:shadow-2xl transition text-center">
            <h4 className="text-xl font-semibold mb-2 text-gray-800">
              Coastal Explorer
            </h4>
            <p className="text-gray-600">
              Discover hidden beaches and coastal wildlife with ease.
            </p>
          </div>
        </div>
      </section>

      <section
        id="cta"
        className="w-full max-w-7xl mx-auto px-8 py-16 text-center bg-[#009B8E] rounded-xl mb-8"
      >
        <h3 className="text-3xl font-bold mb-4 text-white">Ready to Paddle Out?</h3>
        <p className="text-white mb-6 text-lg">
          Discover breathtaking places and create lasting memories — all with the right gear.
        </p>
        <a
          href="#products"
          className="bg-[#007F6E] hover:bg-[#005F50] text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          See Full Catalog
        </a>
      </section>
    </>
  )
}

export default Features