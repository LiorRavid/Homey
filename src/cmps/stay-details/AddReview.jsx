import { Component } from 'react'
import Avatar from '@mui/material/Avatar';

import { userService } from '../../services/user.service.js'


export class AddReview extends Component {

    state = {
        loggedInUser: null,
        review: {
            txt: '',
            rate: {
                Cleanliness: null,
                Communication: null,
                "Check-in": null,
                Accuracy: null,
                Location: null,
                Value: null
            }
        }
    }

    componentDidMount(){
        this.setState({ loggedInUser: userService.getLoggedinUser() }, () => console.log('state in preview', this.state));
    }

    handleChange = ({ target }) => {
        const { value } = target;
        this.setState({ review: { ...this.state.review, txt: value } }, () => console.log('this.state.review.txt', this.state.review.txt));
    };
    sendReview = () => {
        let { review,loggedInUser } = this.state;
        review.by = {
            _id: loggedInUser._id,
            fullname: loggedInUser.fullname,
            imgUrl: loggedInUser.imgUrl
        }
        if (loggedInUser.isGuest) this.props.addGuestReview(review)

    };

    render() {
        const { review, loggedInUser } = this.state
        // const imgUrl = (loggedInUser) ? loggedInUser.imgUrl : Avatar
        const fullname = (loggedInUser) ? loggedInUser.fullname : 'Guest'

        return (
            <section className="add-review">
                <h2>Add Review</h2>
                <div className="loggedin-user">

                <Avatar src="/broken-image.jpg" />

                <h3>{fullname}</h3>
                </div>


                <textarea
                    type="text"
                    name="txt"
                    autoComplete="off"
                    onChange={this.handleChange}
                    value={review.txt}
                    placeholder="Write your opinion about this stay..."

                />

                <button onClick={this.sendReview}> send </button>
            </section>
        )
    }

}
