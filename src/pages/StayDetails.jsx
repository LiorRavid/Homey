

import React from 'react'
// import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Route } from 'react-router-dom'


import { stayService } from '../services/stay.service.js'
// import { addReview } from '../store/review.actions.js'

export class StayDetails extends React.Component {
    state = {
        stay: null,
        reviews: [],
        // loggedInUser:'',
        review:''
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

    // handleChange = ({ target }) => {
    //     const field = target.name
    //     this.setState((prevState) => ({ ...prevState, review: { ...prevState.review, [field]: target.value } }))
    // }

    // onGoBack = () => {
    //     this.props.history.push('/toy')
    // }


    // addToyReview = (ev) => {
    //     const { review, toy } = this.state
    //     ev.preventDefault()
    //     review.toyId = toy._id
    //     this.props.addReview(review)
    // }


    //ADD REVIEW MODAL (NESTED ROUTE)
    // addReviewModal = () => {

    //     console.log('modalactive!');
    //     const { toy } = this.state
    //     // TO DO : ADD USER CONNECTED!!!!!
    //     /// Dont let users that are not logged in to add review.

    //     return (
    //         <div className="add-review">
    //             <Link className="close-btn" to={`/toy/${toy._id}`}>x</Link>
    //             <h1>Add toy Review</h1>
    //             <form onSubmit={this.addToyReview}>
    //                 <label htmlFor="review-info">Your review</label>
    //                 <textarea onChange={this.handleChange} name="txt" id="review-info" cols="20" rows="10"></textarea>
    //                 <button>Submit</button>
    //             </form>
    //         </div>
    //     )

    // }

    getReviewsAvg = (reviews) => {
        const sum = reviews.reduce((acc, review) => {
            return acc + review.rate;
        }, 0);

        const average = sum / reviews.length;

        console.log(average);
        return Number.parseFloat(average).toFixed(2)
    }
    getDateFromTimeStemp = (timeStemp) => {
        var a = new Date(timeStemp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month + ' ' + year;
        return time;
    }



    render() {
        const { stay, reviews } = this.state
        const reviewsAvg = this.getReviewsAvg(reviews)

        if (!stay) return <h1>Loading...</h1>

        return (
            <div className="stay-details">
                <section className="title">
                    <h1>{stay.name}</h1>
                    <p>⭐ {reviewsAvg} ({reviews.length} reviews)</p>
                    <p>∙</p>
                    <p>{stay.loc.address}</p>
                </section>

                <section className="gallery">
                    {stay.imgUrls.map((imgUrl, idx) => <img src={imgUrl} alt="" key={idx} />)}
                </section>

                <section className="info">
                    <div className="info-title">
                        <h2>Entire {stay.type} hosted by {stay.host.fullname}</h2>
                        <p>{stay.capacity} guests ∙ {stay.rooms} ∙ {stay.beds} ∙ {stay.baths}</p>
                        {/* <img src={`../assets${stay.host.imgUrl}`} alt="" /> */}
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

                        {stay.amenities.map((amenitie,idx) => <p key={idx}>{amenitie}</p>)}
                    </div>
                </section>

                <section className="reviews">
                    <h2>⭐ {reviewsAvg} ({reviews.length} reviews)</h2>
                    <div className="review-list">
                        {stay.reviews.map(review => {
                            return <div className="review-card" key={review.id}>
                                <div className="review-card-header">
                                    {/* <img src={review.by.imgUrl} alt="" /> */}
                                    <h3>{review.by.fullname}</h3>
                                    <small>{this.getDateFromTimeStemp(review.createdAt)}</small>
                                </div>
                                <p>{review.txt}</p>
                            </div>
                        })}
                    </div>
                </section>

                <section className="add-review">
                    <h2>Add Review</h2>
                </section>

                
            </div>

        )
    }

}


// const mapDispatchToProps = {
//     addReview
// }


// export const ToyDetails = connect(null, mapDispatchToProps)(_ToyDetails)