import React from 'react';
import { SiAirbnb } from 'react-icons/si';
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi"

function Header() {
    return (
        <div className='header'>

            <div className='header-left'>
                <SiAirbnb size="2em" color="blue" />
                <span className='homey'>  homey</span>
            </div>

            <div className='header-right'>
                <button>Became a Host</button>
                <button>Explore</button>
                <button className='user-icon'><GiHamburgerMenu className='ham-icon' size="1.05rem"/><FaUserCircle size="1.5rem" color="#717171"/></button>
                
            </div>


        </div>

    )
}

export default Header