import Hero from '../components/Hero'
import Gallery from '../components/Gallery'
import Features from '../components/Features'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <main className="pt-20 bg-gray-100 text-gray-800 font-sans">
      <Hero />
      <Gallery />
      <Features />
      <Footer />
    </main>
  )
}

export default HomePage