import { Link } from 'react-router-dom'

export function PopDestination({ onSearch }) {

    function onSelectTopCity(city) {
        const trip = {
            guests: { adults: 1, kids: 0 },
            loc: { address: city },
            time: { checkIn: '', checkOut: '' }
        }
        onSearch(trip)
    }

    return (
        <main className="top-cities-gallery">
            
            <h1 className='head-line-popular-destinations'>Popular Destinations</h1>

            <section className='top-cities'>
            <Link to={`/explore?location=New York&minPrice=-Infinity&maxPrice=Infinity`} className="top-cities-card clean-link">
                <img src="https://res.cloudinary.com/dxdtpxsax/image/upload/v1642756388/airbnb/pop-des/x7oh3muult8plsfm5x2a.jpg" alt="TopCities" />
                <div className="city-details-container">
                    <h3>New York</h3>
                    <div className="city-details">
                        <h4>USA</h4>
                    </div>
                </div>
            </Link>
            <Link to={`/explore?location=Sydney&minPrice=-Infinity&maxPrice=Infinity`} className="top-cities-card clean-link">
                <img src="https://res.cloudinary.com/dxdtpxsax/image/upload/v1642756198/airbnb/pop-des/fvslkcejjnvtfvn0pmhv.jpg" alt="TopCities"/>
                <div className="city-details-container">
                    <h3>Sydney</h3>
                    <div className="city-details">
                        <h4>Australia</h4>
                    </div>
                </div>
            </Link>
            <Link to={`/explore?location=London&minPrice=-Infinity&maxPrice=Infinity`} className="top-cities-card clean-link">
                <img src="https://res.cloudinary.com/dxdtpxsax/image/upload/v1642756666/airbnb/pop-des/jksu6r9vs5i18o4eulbs.jpg" alt="TopCities"/>
                <div className="city-details-container">
                    <h3>London</h3>
                    <div className="city-details">
                        <h4>England</h4>
                    </div>
                </div>
            </Link>
            <Link to={`/explore?location=Paris&minPrice=-Infinity&maxPrice=Infinity`}  className="top-cities-card clean-link">
                <img src="https://res.cloudinary.com/dxdtpxsax/image/upload/v1642756852/airbnb/pop-des/eyyvzabrv7d0ob3kfafk.jpg" alt="TopCities"/>
                <div className="city-details-container">
                    <h3>Paris</h3>
                    <div className="city-details">
                        <h4>France</h4>
                    </div>
                </div>
            </Link>
            </section>
        </main>
    )
}