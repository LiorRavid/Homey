import { Link } from 'react-router-dom'

import { reviewService } from '../services/review.service.js'
// import { StayGallery } from './StayGallery.jsx'

export function StayPreview({ stay }) {
    const imgUrl = stay.imgUrls[0]
    console.log(stay.reviews)
    const rate = reviewService.getReviewsAvg(stay.reviews)
    console.log(rate)
    return (
        <Link to={`/stay/${stay._id}`} className=" stay-preview-container clean-link">
            <div className="stay-preview-card">
                {/* <StayGallery stay={stay}/> */}
                <img src={imgUrl} />
                <div className="stay-preview-info">
                    <span className="stay-preview-rate">
                        <i className="fas fa-star"></i>
                        <p>{rate.total}</p>
                        <p>( {stay.reviews.length} )</p>
                    </span>
                    <p>
                        <span>{stay.type}</span>
                        •
                        <span>{stay.loc.address.substring(0, stay.loc.address.indexOf(','))}</span>
                    </p>
                    <p>{stay.name}</p>
                    <p className="stay-price"><span >${stay.price}</span> / night</p>
                </div>
            </div>
        </Link>
    )
}