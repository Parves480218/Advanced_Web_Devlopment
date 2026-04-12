import Header from '../components/Header'
import Hero from '../components/Hero'
import Gallery from '../components/Gallery'
import Features from '../components/Features'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Gallery />
        <Features />
      </main>
      <Footer />
    </>
  )
}

export default HomePage