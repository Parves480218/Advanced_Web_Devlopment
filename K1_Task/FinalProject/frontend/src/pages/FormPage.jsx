import { useState } from "react";

function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Failed to save");
      }

      const data = await res.json();
      setMessage(`Booking saved for ${data.name}`);
      setFormData({
        name: "",
        email: ""
      });
    } catch (err) {
      setMessage("Error saving booking");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 pt-28 px-6 pb-12">
      <section className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#0077B6] to-[#00BFA6] text-white px-8 py-10">
          <h1 className="text-4xl font-bold mb-3">Book Your Paddle Adventure</h1>
          <p className="text-lg">
            Reserve your kayaking experience with PaddleJoy in just a few steps.
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#00BFA6] hover:bg-[#009B8E] disabled:opacity-60 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              {isSubmitting ? "Submitting..." : "Submit Booking"}
            </button>
          </form>

          {message && (
            <div className="mt-6 p-4 rounded-lg bg-gray-100 text-gray-800 font-medium">
              {message}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default FormPage;