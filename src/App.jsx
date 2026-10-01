import Nav from './components/Nav'
import Hero from './components/Hero'
import TalentModel from './components/TalentModel'
import Gallery from './components/Gallery'
import { Why, Vision, Programs, Microdegree, Departments, News, FinalCTA, Footer } from './components/Sections'

function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="aurora aurora--1" />
      <div className="aurora aurora--2" />
      <div className="aurora aurora--3" />
      <div className="grid-overlay" />
      <div className="noise" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">본문으로 바로가기</a>
      <Backdrop />
      <Nav />
      <main id="main">
        <Hero />
        <Why />
        <Vision />
        <TalentModel />
        <Programs />
        <Gallery />
        <Microdegree />
        <Departments />
        <News />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
