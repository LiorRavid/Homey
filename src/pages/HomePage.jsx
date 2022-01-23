import React from 'react'
import { Hero } from '../cmps/home/Hero.jsx'
import { PopDestination } from '../cmps/home/PopDestination.jsx'
import { TopRated } from '../cmps/home/TopRated.jsx'
import { BecomeHost } from '../cmps/home/BecomeHost.jsx'
import { AppFooter } from '../cmps/AppFooter'

export class HomePage extends React.Component {

    state = {
        isWindowTop: true,
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);

    }

    handleScroll = (event) => {
        this.getScrollPos()
    }


    getScrollPos = () => {
        const isWindowTop = (window.scrollY)
        if (isWindowTop < 100) {
            this.setState({ isWindowTop: true },()=>{console.log(this.state)})
        } else {
            this.setState({ isWindowTop: false },()=>{console.log(this.state)})
        }
    }

    render() {

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
}
