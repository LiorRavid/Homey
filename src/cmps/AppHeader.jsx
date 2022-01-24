import React from 'react';
import { SiAirbnb } from 'react-icons/si';
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi"
import { Link } from "react-router-dom"
import { withRouter } from 'react-router-dom';
import { SearchFilter } from './SearchFilter.jsx';
import { BiSearch } from "react-icons/bi"


class _AppHeader extends React.Component {

    state = {
        isFullHeader: true,

    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);

    }

    handleScroll = (event) => {
        const { scrollY } = (window)
        // console.log(scrollY)
        if (scrollY < 100 && !this.state.isFullHeader) {
            this.setState({ isFullHeader: true }, () => { console.log(this.state) })
        } else if (scrollY > 100 && this.state.isFullHeader) {
            this.setState({ isFullHeader: false }, () => { console.log(this.state) })
        }
    }


    onSearch = (searchValue) => {

        // console.log('searchValue', searchValue)
        this.props.history.push(`/explore?location=${searchValue.location}&minPrice=-Infinity&maxPrice=Infinity&checkIn=${searchValue["check-in"]}&checkOut=${searchValue["check-out"]}&guests=${searchValue.guests}`)
    }


    render() {
        const { location } = this.props
        const headerBackground = (location.pathname === "/") ? "header-container" : ""
        const headerColor = (location.pathname === "/") ? "header-dark" : "header-bright"
        const headerLogoColor = (location.pathname === "/") ? "white" : "#ff385c"
        const { isFullHeader } = this.state
        
        return (
            <section className={`main-container ${isFullHeader?'full-header':''} ${headerColor} ${headerBackground} full`}>

                <div className="header">

                    <div className="header-details">

                        <Link className='homey clean-link' to="/">
                            <div className='header-left'>
                                <SiAirbnb size="2em" color={headerLogoColor} />

                            </div>
                            homey</Link>

                        {!isFullHeader && <div className='header-center'>
                            <input type="text" placeholder='Start your search' />
                            <BiSearch className='search-icon' />
                        </div>}

                        <div className='header-right'>
                            <Link className='btn-explore clean-link' to={`/explore?location=&minPrice=-Infinity&maxPrice=Infinity`}>Explore</Link>
                            {/* <button>Explore</button> */}
                            <Link className='btn-host clean-link' to="/host">Become a host</Link>
                            <button className='user-icon'><GiHamburgerMenu className='ham-icon' size="1.05rem" color="black" /><FaUserCircle color="#717171" /></button>

                        </div>
                    </div>

                    {isFullHeader && <SearchFilter onSearch={this.onSearch} />}


                </div>

             </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)