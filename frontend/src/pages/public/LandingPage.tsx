import HeroSection from '../../components/landing/HeroSection'
import PopularDestinations from '../../components/landing/PopularDestinations'
import VerifiedHomes from '../../components/landing/VerifiedHomes'
import WhyUs from '../../components/landing/WhyUs'
import CTA from '../../components/landing/CTA'
import ListOnGreenSpringHomes from '../../components/landing/ListOnQuickStay'

const LandingPage = () => {
  return (
    <>
      <HeroSection/>
      <PopularDestinations/>
      <VerifiedHomes/>
      <WhyUs/>
      <ListOnGreenSpringHomes/>
      <CTA/>
    </>
  )
}

export default LandingPage