import { Link } from 'react-router-dom'

export function TopRated({ onSearch }) {

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
            
            <h1>Top Rated </h1>
           
           <section className='top-cities'>

            <Link to={`/explore?location=Bangkok&minPrice=-Infinity&maxPrice=Infinity`}  className="top-cities-card clean-link">
                <img src="https://res.cloudinary.com/dxdtpxsax/image/upload/v1642760367/airbnb/pop-des/uwlmwbvado6u2qhqtky8.jpg" alt="TopCities" />
                <div className="city-details-container">
                    <h3>Bangkok</h3>
                    <div className="city-details">
                        <h4>Thailand</h4>
                    </div>
                </div>
            </Link>
            <Link to={`/explore?location=Madrid&minPrice=-Infinity&maxPrice=Infinity`}  className="top-cities-card clean-link">
                <img src="https://res.cloudinary.com/dxdtpxsax/image/upload/v1642760507/airbnb/pop-des/bkq1qhmroiuqdogiy3x1.jpg" alt="TopCities"/>
                <div className="city-details-container">
                    <h3>Madrid</h3>
                    <div className="city-details">
                        <h4>Spain</h4>
                    </div>
                </div>
            </Link>
           </section>
        </main>
    )
}