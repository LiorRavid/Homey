

import React from 'react'
import Avatar from '@mui/material/Avatar';

// import { connect } from 'react-redux'
// import { Link, NavLink } from 'react-router-dom'
// import { Route } from 'react-router-dom'


import { stayService } from '../services/stay.service.js'
import { reviewService } from '../services/review.service.js'
import { utilService } from '../services/util.service.js'
import { AddReview } from '../cmps/AddReview.jsx'

export class StayDetails extends React.Component {
    state = {
        stay: null,
        reviews: [],
       
    }


    componentDidMount() {
        this.loadStay()
    }

    loadStay = () => {
        const { stayId } = this.props.match.params
        stayService.getById(stayId).then((stay) => {
            console.log('stay from details', stay)
            const reviews = [...stay.reviews]
            this.setState({ stay, reviews })
        })
        // , () => { console.log('the state after stay', this.state) }
    }

    addGuestReview = (review) =>{
        this.setState({ reviews: [ ...this.state.reviews, review ] }, () => console.log('reviews in detail', this.state.reviews));

    }

    render() {
        const { stay, reviews } = this.state
        const reviewsAvg = reviewService.getReviewsAvg(reviews)

        if (!stay) return <h1>Loading...</h1>

        return (
            <div className="stay-details">
                <section className="title">
                    <h1>{stay.name}</h1>
                    <p>⭐ {reviewsAvg.total} ({reviews.length} reviews)</p>
                    <p>∙</p>
                    <p>{stay.loc.address}</p>
                </section>

                <section className="gallery">
                    {stay.imgUrls.map((imgUrl, idx) => <img src={imgUrl} alt="" key={idx} />)}
                </section>

                <section className="info">
                    <div className="info-header">
                        <div className="info-header-title">
                        <h2>Entire {stay.type} hosted by {stay.host.fullname}</h2>
                        <p>{stay.capacity} guests ∙ {stay.rooms} ∙ {stay.beds} ∙ {stay.baths}</p>
                        </div>

                        <Avatar className="user-img" src={stay.host.imgUrl} />

                        {/* <img className="user-img" src={stay.host.imgUrl} alt="" /> */}
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

                <section className="reviews">
                    <h2>⭐ {reviewsAvg.total} ({reviews.length} reviews)</h2>
                    <div className="review-statistics">
                        <p>Cleanliness {reviewsAvg.cleanliness}</p>
                        <p>Accuracy {reviewsAvg.accuracy}</p>
                        <p>Communication {reviewsAvg.communication}</p>
                        <p>Location {reviewsAvg.location}</p>
                        <p>Check-in {reviewsAvg["check-in"]}</p>
                        <p>Value {reviewsAvg.value}</p>
                    </div>
                    <div className="review-list">
                        {stay.reviews.map(review => {
                            return <div className="review-card" key={review.id}>
                                <div className="review-card-header">
                                    <Avatar className="user-img" src={review.by.imgUrl} />
                                    <div>
                                    <h3>{review.by.fullname}</h3>
                                    <small>{utilService.getDateFromTimeStemp(review.createdAt)}</small>
                                    </div>
                                </div>
                                <p>{review.txt}</p>
                            </div>
                        })}
                    </div>
                </section>

                <AddReview addGuestReview={this.addGuestReview}/>
            


            </div>

        )
    }

}

// const mapDispatchToProps = {
//     addReview
// }


// export const ToyDetails = connect(null, mapDispatchToProps)(_ToyDetails)