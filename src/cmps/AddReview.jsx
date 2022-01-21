import { Component } from 'react'
import Avatar from '@mui/material/Avatar';

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

    handleChange = ({ target }) => {
        const { value } = target;
        this.setState({ review: { ...this.state.review, txt: value } }, () => console.log('this.state.review.txt', this.state.review.txt));
    };
    sendReview = () => {
        const { review } = this.state;
        this.props.addGuestReview(review)
    };

    render() {
        const { review, loggedInUser } = this.state
        // const imgUrl = (loggedInUser) ? loggedInUser.imgUrl : Avatar
        const fullname = (loggedInUser) ? loggedInUser.fullname : 'Guest'

        return (
            <section className="add-review">
                <h2>Add Review</h2>
                <Avatar src="/broken-image.jpg" />

                <h3>{fullname}</h3>


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
