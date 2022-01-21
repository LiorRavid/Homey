import { Link } from "react-router-dom";


export function Hero({ loadStays, addTrip }) {

    async function explorAll() {
        const trip = {
            guests: { adults: 1, kids: 0 },
            loc: { address: '' },
            time: { checkIn: '', checkOut: '' }
        }
        await addTrip(trip)
        loadStays()
    }

    return (
        <section className="main-hero">
            <div>
                <img src="https://res.cloudinary.com/dxdtpxsax/image/upload/v1642688906/airbnb/Home%20page/ziupom9pbudshtrejbrq.webp" />
                <h1>Not sure where to go? Perfect</h1>
                <button onClick={explorAll}><Link to="/explore">Explore now</Link></button>
            </div>
        </section>
    )
}