import React from 'react';
import { SiAirbnb } from 'react-icons/si';
import { FcBusinessman } from "react-icons/fc";

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
                <FcBusinessman size="2em" />
            </div>


        </div>

    )
}

export default Header