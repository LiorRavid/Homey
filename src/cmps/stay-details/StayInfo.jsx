import Avatar from '@mui/material/Avatar';


export function StayInfo({stay}) {

    return (
        <section className="info">
            <div className="info-header">
                <div className="info-header-title">
                    <h2>Entire {stay.type} hosted by {stay.host.fullname}</h2>
                    <p>{stay.capacity} guests ∙ {stay.rooms} ∙ {stay.beds} ∙ {stay.baths}</p>
                </div>

                <Avatar className="user-img" src={stay.host.imgUrl} />

            </div>
            <div className="info-feature">
                <h3>Entire home</h3>
                <small>You’ll have the apartment to yourself.</small>
                <h3>Self check-in</h3>
                <small>Check yourself in with the keypad.</small>
                <h3>Great location</h3>
                <small>95% of recent guests gave the location a 5-star rating.</small>
                <h3>Enhanced Clean</h3>
                <small>This Host committed to Airbnb's 5-step enhanced cleaning process.</small>
            </div>
            <div className="info-description">
                <h2>Description</h2>
                <p>{stay.summary}</p>
            </div>
            <div className="info-amenities">
                <h2>What this place offers</h2>

                {stay.amenities.map((amenitie, idx) => <p key={idx}>{amenitie}</p>)}
            </div>
        </section>
    )
}