import React from 'react';
import { SiAirbnb } from 'react-icons/si';
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi"
import { BiSearch } from "react-icons/bi"
import { Link } from "react-router-dom"

export function AppHeader() {
    return (
        <section className='main-container'>

            <div className='header'>

                <div className="header-details">

                    <div className='header-left'>
                        <SiAirbnb size="2em" color="#ff385c" />
                        <span className='homey'>  homey</span>
                    </div>

                    {/* <div className='header-center'>
                <input type="text" placeholder='Start your search' />
                <BiSearch className='search-icon' />
               
                
            </div> */}

                    <div className='header-right'>
                        <Link className='btn-explore clean-link' to={`/explore?location=&minPrice=-Infinity&maxPrice=Infinity`}>Explore</Link>
                        {/* <button>Explore</button> */}
                        <Link to="/host">Become a host</Link>
                        <button className='user-icon'><GiHamburgerMenu className='ham-icon' size="1.05rem" color="black" /><FaUserCircle color="#717171" /></button>

                    </div>
                </div>

                <div className="header-filter">
                    <div>Location</div>
                    <div>Check in</div>
                    <div>Check out</div>
                    <div>Guests</div>
                    <div>0</div>
                </div>


            </div>

        </section>
    )
}

