import { Link } from "react-router-dom";


export function BecomeHost() {

  

    return (
        <section className="main-become-host">
            <div>
                <div>
                    <img src="https://res.cloudinary.com/dxdtpxsax/image/upload/v1642761705/airbnb/Home%20page/t7a3kpgvxngsktz8kjpv.jpg" />
                </div>
                <h1>Become a host</h1>
                <h3>earn extra income and unlock new opportunities by sharing your space.</h3>
                <button onClick={BecomeHost}><Link to="/explore">Learn more</Link></button>
            </div>
        </section>
    )
}