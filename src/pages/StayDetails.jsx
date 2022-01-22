

import React from 'react'

// import { connect } from 'react-redux'
// import { Link, NavLink } from 'react-router-dom'
// import { Route } from 'react-router-dom'


import { stayService } from '../services/stay.service.js'
import { reviewService } from '../services/review.service.js'
import { StayOrder } from '../cmps/stay-details/StayOrder.jsx'
import { StayInfo } from '../cmps/stay-details/StayInfo.jsx'
import { ReviewList } from '../cmps/stay-details/ReviewList.jsx'
import { AddReview } from '../cmps/stay-details/AddReview.jsx'

export class StayDetails extends React.Component {
    state = {
        stay: null,
        // reviews: [],

    }


    componentDidMount() {
        this.loadStay()
    }

    loadStay = () => {
        const { stayId } = this.props.match.params
        stayService.getById(stayId).then((stay) => {
        
            this.setState({ stay })
        })
        // , () => { console.log('the state after stay', this.state) }
    }

    addGuestReview = (review) => {
        let reviews = [...this.state.stay.reviews, review]
        // reviews.push(review)
        this.setState((prevState) => {
            return { stay: { ...prevState.stay, reviews } }
        })


    }

    render() {
        const { stay } = this.state

        if (!stay) return <h1>Loading...</h1>
        const reviewsAvg = reviewService.getReviewsAvg(stay.reviews)

        return (
            <div className="stay-details">

                <section className="title">
                    <h1>{stay.name}</h1>
                    <p>⭐ {reviewsAvg.total} ({stay.reviews.length} reviews)</p>
                    <p>∙</p>
                    <p>{stay.loc.address}</p>
                </section>

                <section className="gallery">
                    {stay.imgUrls.map((imgUrl, idx) => <img src={imgUrl} alt="" key={idx} />)}
                </section>

                <div className="info-order-container">
                    <StayInfo stay={stay} />
                    <StayOrder stay={stay} reviewsAvg={reviewsAvg.total}/>
                </div>

                <section className="reviews">
                    <h2>⭐ {reviewsAvg.total} ({stay.reviews.length} reviews)</h2>
                    <div className="review-statistics">
                        <p>Cleanliness {reviewsAvg.cleanliness}</p>
                        <p>Accuracy {reviewsAvg.accuracy}</p>
                        <p>Communication {reviewsAvg.communication}</p>
                        <p>Location {reviewsAvg.location}</p>
                        <p>Check-in {reviewsAvg["check-in"]}</p>
                        <p>Value {reviewsAvg.value}</p>
                    </div>

                    <ReviewList stay={stay} />

                </section>

                <AddReview addGuestReview={this.addGuestReview} />



            </div>

        )
    }

}

// const mapDispatchToProps = {
//     addReview
// }


// export const ToyDetails = connect(null, mapDispatchToProps)(_ToyDetails)