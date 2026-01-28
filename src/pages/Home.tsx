// src/pages/Home.tsx - COMPLETE FILE
import SearchHero from '../components/home/SearchHero'
import AboutDatabase from '../components/home/AboutDatabase'
import QuickLinks from '../components/home/QuickLinks'
import LatestNews from '../components/home/LatestNews'
import ServicesSection from '../components/home/ServicesSection'

export default function Home() {
  return (
    <>
      <SearchHero />
      <AboutDatabase />
      <QuickLinks />
      <LatestNews />
      <ServicesSection />
    </>
  )
}