import SearchHero from '../components/home/SearchHero'
import QuickLinks from '../components/home/QuickLinks'
import LatestNews from '../components/home/LatestNews'
import ServicesSection from '../components/home/ServicesSection'
import Footer from '../components/layout/Footer'

export default function Home() {
  return (
    <>
      <SearchHero />
      <QuickLinks />
      <LatestNews />
      <ServicesSection />
      <Footer />
    </>
  )
}