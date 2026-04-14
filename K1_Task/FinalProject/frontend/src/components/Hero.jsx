function Hero() {
  return (
    <section
      id="home"
      className="w-full min-h-screen px-8 py-16 grid md:grid-cols-2 gap-12 items-center bg-gradient-to-r from-[#0077B6] to-[#00BFA6] text-white"
    >
      <div className="flex flex-col justify-center space-y-6 max-w-xl mx-auto md:mx-0">
        <h2 className="text-5xl font-bold">Adventure Starts on the Water</h2>
        <p className="text-lg">
          Feel the thrill of kayaking with PaddleJoy’s premium rentals —
          designed for adventure, excitement, and lasting memories.
        </p>
        <a
          href="#products"
          className="bg-[#00BFA6] hover:bg-[#009B8E] text-white px-6 py-3 rounded-lg font-semibold transition w-max"
        >
          Start Your Adventure
        </a>
      </div>

      <figure className="max-w-xl mx-auto w-full">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
          alt="Kayaking on open water"
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />
      </figure>
    </section>
  )
}

export default Hero