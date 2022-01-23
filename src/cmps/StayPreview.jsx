import { Link } from 'react-router-dom'
import React from 'react'
import { withRouter } from 'react-router-dom';
import { reviewService } from '../services/review.service.js'
import { StayGallery } from './StayGallery.jsx'

// export function StayPreview({ stay }) {
class _StayPreview extends React.Component{

    moveToDetails = ()=>{
        this.props.history.push(`/stay/${this.props.stay._id}`)
    }

    render(){
        const{stay}= this.props
        const rate = reviewService.getReviewsAvg(stay.reviews)
        return (
            // <Link to={`/stay/${stay._id}`} className=" stay-preview-container clean-link">
            <article className=" stay-preview-container" onClick={()=>this.moveToDetails()}>
                <div className="stay-preview-card">
                    <StayGallery stay={stay}/>
                    {/* <img src={imgUrl} /> */}
                    <div className="stay-preview-info">
                        <span className="stay-preview-rate">
                            <i className="fas fa-star"></i>
                            <p>{rate.total}</p>
                            <p>( {stay.reviews.length} reviews )</p>
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
            </article>
            // </Link>
        )
    }
}

export const StayPreview = withRouter(_StayPreview)
