import { Hero } from '../cmps/home/Hero.jsx'
import { PopDestination } from '../cmps/home/PopDestination.jsx'
import { TopRated } from '../cmps/home/TopRated.jsx'
import { BecomeHost } from '../cmps/home/BecomeHost.jsx'
import { AppFooter } from '../cmps/AppFooter'

export function HomePage() {
    return (
        <section className="home-page main-container full">
            
            <Hero />
            <PopDestination />
            <TopRated />
            <BecomeHost />
            <AppFooter />
        </section>
    )
}
    