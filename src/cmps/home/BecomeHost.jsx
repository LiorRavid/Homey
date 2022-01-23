import { Link } from "react-router-dom";


export function BecomeHost() {

  

    return (
        <section className="main-become-host">
           
            
                <h1>Become a host</h1>
                <h3>earn extra income and unlock new opportunities by sharing your space.</h3>
                <button onClick={BecomeHost}><Link className="clean-link" to="/host">Learn more</Link></button>
            
        </section>
    )
}