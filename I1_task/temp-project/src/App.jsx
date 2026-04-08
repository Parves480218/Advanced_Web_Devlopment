function App() {
  return (
    <>
      <header className="bg-[#004E89] fixed w-full z-50 shadow">
        <div className="max-w-7xl mx-auto px-8 py-4 grid grid-cols-2 items-center">
          <h1 className="text-2xl font-extrabold text-white">PaddleJoy</h1>
          <nav className="justify-self-end flex flex-wrap gap-3 sm:gap-6 text-sm sm:text-base">
            <a href="#home" className="text-white hover:text-[#00BFA6] font-medium transition">Home</a>
            <a href="#products" className="text-white hover:text-[#00BFA6] font-medium transition">Catalog</a>
            <a href="#cta" className="text-white hover:text-[#00BFA6] font-medium transition">Order</a>
          </nav>
        </div>
      </header>

      <main className="pt-20 bg-gray-100 text-gray-800 font-sans">
        <section
          id="home"
          className="w-full min-h-screen px-8 py-16 grid md:grid-cols-2 gap-12 items-center bg-gradient-to-r from-[#0077B6] to-[#00BFA6] text-white"
        >
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-5xl font-bold">Adventure Starts on the Water</h2>
            <p className="text-lg">
              Feel the thrill of kayaking with PaddleJoy’s premium rentals — designed for
              adventure, excitement, and lasting memories.
            </p>
            <a
              href="#products"
              className="bg-[#00BFA6] hover:bg-[#009B8E] text-white px-6 py-3 rounded-lg font-semibold transition w-max"
            >
              Start Your Adventure
            </a>
          </div>
          <figure>
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
              alt="Kayaking on open water"
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </figure>
        </section>

        <section id="about" className="w-full max-w-7xl mx-auto px-8 py-12 bg-[#E0F7FA] rounded-xl mb-8 mt-8">
          <div className="grid place-items-center text-center gap-6">
            <h3 className="text-3xl font-bold text-gray-800">About PaddleJoy</h3>
            <p className="text-gray-700 text-lg max-w-3xl">
              PaddleJoy brings water adventures to everyone. Our mission is to make kayaking
              and paddleboarding accessible, exciting, and safe for all skill levels.
              Explore lakes, rivers, and coastlines with confidence and comfort.
            </p>
          </div>
        </section>

        <section id="products" className="w-full max-w-7xl mx-auto px-8 py-12 mb-8">
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">Featured Rentals</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-white rounded-xl shadow p-4 text-center hover:shadow-2xl transition">
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&w=900&q=80"
                  alt="Single Kayak"
                  className="rounded-lg mb-4 w-full h-64 object-cover"
                />
              </figure>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Solo Kayaks</h4>
              <p className="text-gray-600">Stable, lightweight kayaks perfect for lakes and calm rivers.</p>
            </article>

            <article className="bg-white rounded-xl shadow p-4 text-center hover:shadow-2xl transition">
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?auto=format&fit=crop&w=900&q=80"
                  alt="Tandem Kayak"
                  className="rounded-lg mb-4 w-full h-64 object-cover"
                />
              </figure>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Tandem Kayaks</h4>
              <p className="text-gray-600">Share the adventure with a partner in our spacious two-seaters.</p>
            </article>

            <article className="bg-white rounded-xl shadow p-4 text-center hover:shadow-2xl transition">
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1516298773066-c48f8e9bd92b?auto=format&fit=crop&w=900&q=80"
                  alt="Paddle Board"
                  className="rounded-lg mb-4 w-full h-64 object-cover"
                />
              </figure>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Stand-Up Paddle Boards</h4>
              <p className="text-gray-600">Great for balance, fitness, and exploring peaceful coastlines.</p>
            </article>
          </div>
        </section>

        <section id="features" className="w-full max-w-7xl mx-auto px-8 py-12 bg-[#E0F7FA] rounded-xl mb-8">
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">Why Rent with PaddleJoy?</h3>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h4 className="text-xl font-semibold mb-2">Top-Quality Gear</h4>
              <p className="text-gray-600">Regularly maintained, reliable, and beginner-friendly equipment.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Affordable Pricing</h4>
              <p className="text-gray-600">Adventure should be accessible — our rentals fit every budget.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Safety First</h4>
              <p className="text-gray-600">Life jackets, tutorials, and guidance to keep you confident on the water.</p>
            </div>
          </div>
        </section>

        <section id="routes" className="w-full max-w-7xl mx-auto px-8 py-12 mb-8 bg-[#B2EBF2] rounded-xl">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Popular Routes & Adventures</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow p-4 hover:shadow-2xl transition text-center">
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Serene Lake Paddle</h4>
              <p className="text-gray-600">Perfect for beginners, enjoy calm waters and scenic views.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 hover:shadow-2xl transition text-center">
              <h4 className="text-xl font-semibold mb-2 text-gray-800">River Rapids Adventure</h4>
              <p className="text-gray-600">Feel the thrill on gentle rapids with our guided tours.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 hover:shadow-2xl transition text-center">
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Coastal Explorer</h4>
              <p className="text-gray-600">Discover hidden beaches and coastal wildlife with ease.</p>
            </div>
          </div>
        </section>

        <section id="cta" className="w-full max-w-7xl mx-auto px-8 py-16 text-center bg-[#009B8E] rounded-xl mb-8">
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
      </main>

      <footer className="text-center py-6 text-white border-t bg-[#006994]">
        © 2025 PaddleJoy — Kayak & Paddle Rentals
      </footer>
    </>
  )
}

export default App