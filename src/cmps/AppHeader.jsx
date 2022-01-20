import React from 'react';
import { SiAirbnb } from 'react-icons/si';
import { FaUserCircle } from "react-icons/fa";

function Header() {
    return (
        <div>

            <div className='header-left'>
                <SiAirbnb size="2em" color="blue" />
                <span> homey</span>
            </div>

            <div className='header-right'>
                <p>Became a Host</p>
                <p>Explore</p>
                <FaUserCircle size="2em" color="#717171"/>
            </div>


        </div>

    )
}

export default Header