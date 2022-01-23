import React from 'react';
import { SiAirbnb } from 'react-icons/si';
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi"
import { BiSearch } from "react-icons/bi"
import { Link } from "react-router-dom"

export function AppHeader() {
    return (
        <section className='main-container header-container full'>

            <div className='header'>

                <div className="header-details">

                    <div className='header-left'>
                        <SiAirbnb size="2em" color="white" />
                        <Link className='homey clean-link' to="/"> homey</Link>
                        {/* <span className='homey'>  homey</span> */}
                    </div>

                    {/* <div className='header-center'>
                <input type="text" placeholder='Start your search' />
                <BiSearch className='search-icon' />
               
                
            </div> */}

                    <div className='header-right'>
                        <Link className='btn-explore clean-link' to={`/explore?location=&minPrice=-Infinity&maxPrice=Infinity`}>Explore</Link>
                        {/* <button>Explore</button> */}
                        <Link className='btn-host clean-link' to="/host">Become a host</Link>
                        <button className='user-icon'><GiHamburgerMenu className='ham-icon' size="1.05rem" color="black" /><FaUserCircle color="#717171" /></button>

                    </div>
                </div>

                <div className="header-filter">
                   
                   <label><span>Location</span><input name="address" autocomplete="off" id="location" type="search" placeholder="Where are you going?" value="Tel Aviv" /></label>
                    <label for="check-in"><span>Check in</span><input id="check-in" autocomplete="off" placeholder="Add dates" value="" /></label>
                    <label for="check-out"><span>Check out</span><input id="check-out" autocomplete="off" placeholder="Add dates" value="" /></label>
                    <label class="guests" for="guests"><span>Guests</span><input id="guests" name="guests" placeholder="Add guests" value="1  guests" /></label>

                    <div><BiSearch className='search-icon' /></div>
                </div>


            </div>

        </section>
    )
}
{/* <input name="address" autocomplete="off" id="location" type="search" placeholder="Where are you going?" value="Tel Aviv"></input> */}
                    // <div>Location</div>
                    // <div>Check in</div>
                    // <div>Check out</div>
                    // <div>Guests</div>