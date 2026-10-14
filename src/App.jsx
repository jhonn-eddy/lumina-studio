import { useRef, useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Gallery from './components/Gallery.jsx'
import Pricing from './components/Pricing.jsx'
import Booking from './components/Booking.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const bookingRef = useRef(null)
  const [selectedPackage, setSelectedPackage] = useState('')

  const choosePackage = (name) => {
    setSelectedPackage(name)
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Gallery />
        <Pricing onSelectPackage={choosePackage} />
        <Booking sectionRef={bookingRef} selectedPackage={selectedPackage} onPackageChange={setSelectedPackage} />
      </main>
      <Footer />
    </>
  )
}
