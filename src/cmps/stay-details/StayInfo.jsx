import Avatar from '@mui/material/Avatar';
import { AiOutlineHome,AiOutlineWifi } from 'react-icons/ai';
import { TiKeyOutline } from 'react-icons/ti';
import { HiOutlineLocationMarker, HiOutlineSparkles } from 'react-icons/hi';
import { FiMonitor,FiSpeaker } from 'react-icons/fi';
import { MdOutlineTakeoutDining,MdOutlineBeachAccess,MdOutlinePets } from 'react-icons/md';
import { CgSmartHomeWashMachine } from 'react-icons/cg';
// import { IoSparklesOutline } from 'react-icons/io';



export function StayInfo({ stay }) {

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
                <div className="feature-container">
                    <div className="feature-icon">
                        <AiOutlineHome />
                    </div>
                    <div className="feature-txt">
                        <h3> Entire home</h3>
                        <p>You’ll have the apartment to yourself.</p>
                    </div>
                </div>
                <div className="feature-container">
                    <div className="feature-icon">
                        <TiKeyOutline />
                    </div>
                    <div className="feature-txt">
                        <h3>Self check-in</h3>
                        <p>Check yourself in with the keypad.</p>
                    </div>
                </div>
                <div className="feature-container">
                    <div className="feature-icon">
                        <HiOutlineLocationMarker />
                    </div>
                    <div className="feature-txt">
                        <h3>Great location</h3>
                        <p>95% of recent guests gave the location a 5-star rating.</p>
                    </div>
                </div>
                <div className="feature-container">
                    <div className="feature-icon">
                        <HiOutlineSparkles />
                    </div>
                    <div className="feature-txt">
                        <h3>Enhanced Clean</h3>
                        <p>This Host committed to Airbnb's 5-step enhanced cleaning process.</p>
                    </div>
                </div>
            </div>
            <div className="info-description">
                <h2>Description</h2>
                <p>{stay.summary}</p>
            </div>
            <div className="info-amenities">
                <h2>What this place offers</h2>
                <div className="amenities-list">
                    {stay.amenities.map((amenitie, idx) => {
                        let icon
                        switch (amenitie) {
                            case 'TV':
                                return <p key={idx}> <FiMonitor /> {amenitie}</p>
                                break;
                            case 'TV with standard cable':
                                return <p key={idx}> <FiMonitor /> {amenitie}</p>
                                break;
                            case 'Wifi':
                                return <p key={idx}> <AiOutlineWifi /> {amenitie}</p>
                                break;
                            case 'Kitchen':
                                return <p key={idx}> <MdOutlineTakeoutDining /> {amenitie}</p>
                                break;
                            case 'Washer':
                                return <p key={idx}> <CgSmartHomeWashMachine /> {amenitie}</p>
                                break;
                            case 'Beach access':
                                return <p key={idx}> <MdOutlineBeachAccess /> {amenitie}</p>
                                break;
                            case 'Pets allowed':
                                return <p key={idx}> <MdOutlinePets /> {amenitie}</p>
                                break;
                            case 'Sound system with aux':
                                return <p key={idx}> <FiSpeaker /> {amenitie}</p>
                                break;

                            default:
                                return <p key={idx}>{amenitie}</p>
                                break;
                        }
                    })}
                </div>
            </div>
        </section>
    )
}