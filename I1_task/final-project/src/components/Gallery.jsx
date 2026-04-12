function Gallery() {
  return (
    <section id="products" className="w-full max-w-7xl mx-auto px-8 py-12 mb-8">
      <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Featured Rentals
      </h3>

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
          <p className="text-gray-600">
            Stable, lightweight kayaks perfect for lakes and calm rivers.
          </p>
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
          <p className="text-gray-600">
            Share the adventure with a partner in our spacious two-seaters.
          </p>
        </article>

        <article className="bg-white rounded-xl shadow p-4 text-center hover:shadow-2xl transition">
          <figure>
            <img
              src="https://images.unsplash.com/photo-1516298773066-c48f8e9bd92b?auto=format&fit=crop&w=900&q=80"
              alt="Paddle Board"
              className="rounded-lg mb-4 w-full h-64 object-cover"
            />
          </figure>
          <h4 className="text-xl font-semibold mb-2 text-gray-800">
            Stand-Up Paddle Boards
          </h4>
          <p className="text-gray-600">
            Great for balance, fitness, and exploring peaceful coastlines.
          </p>
        </article>
      </div>
    </section>
  )
}

export default Gallery