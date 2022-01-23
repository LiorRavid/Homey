import React from 'react';
import { SiAirbnb } from 'react-icons/si';
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi"
import { BiSearch } from "react-icons/bi"
import { Link } from "react-router-dom"
import { withRouter } from 'react-router-dom';


 function _AppHeader(props) {
    
    
    const headerBackground = (props.location.pathname === "/")? "header-container" : ""
    const headerColor = (props.location.pathname === "/")? "header-dark" : "header-bright"
    const headerLogoColor = (props.location.pathname === "/")? "white" : "#ff385c"
    console.log('props:', props);
    
    

    return (
        <section className={`main-container  ${ headerColor } ${headerBackground} full`}>

            <div className="header">

                <div className="header-details">

                        <Link className='homey clean-link' to="/">
                    <div className='header-left'>
                        <SiAirbnb size="2em" color={headerLogoColor} />
                    
                    </div>
                             homey</Link>

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
                   
                   <label><span>Location</span><input name="address" autoComplete="off" id="location" type="search" placeholder="Where are you going?" value="Tel Aviv" /></label>
                    <label htmlFor="check-in"><span>Check in</span><input id="check-in" autoComplete="off" placeholder="Add dates" value="" /></label>
                    <label htmlFor="check-out"><span>Check out</span><input id="check-out" autoComplete="off" placeholder="Add dates" value="" /></label>
                    <label className='guests' htmlFor="guests"><span>Guests</span><input id="guests" name="guests" placeholder="Add guests" value="1  guests" /></label>

                    <div><BiSearch className='search-icon' /></div>
                </div>


            </div>

        </section>
    )
}

export const AppHeader = withRouter(_AppHeader)