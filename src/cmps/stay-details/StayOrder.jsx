import { Component } from 'react'



export class StayOrder extends Component {

    state = {
        stay: null
    }

    componentDidMount() {
        const { stay } = this.props
        this.setState({ stay: { ...stay } })

    }

    render() {
        const { stay } = this.state

        if (!stay) return <h1>Loading...</h1>
        const { reviewsAvg } = this.props

        console.log(stay)
        return (
            <section className="order-container">
                <div className="order-form-container">
                    <div className="order-form">
                        <div className="order-form-header">
                            <h2>${stay.price} <span>/night</span></h2>
                            <p>⭐ {reviewsAvg} ({stay.reviews.length} reviews)</p>

                        </div>
                        <form>
                            <div className="order-form-date">
                                <label htmlFor="check-in">
                                    <span>Check-in</span>
                                    <input id="check-in" type="date" />
                                </label>
                                <label htmlFor="check-out">
                                    <span>Check-out</span>
                                    <input id="check-out" type="date" />
                                </label>
                            </div>
                            <div className="order-form-guest">
                                <label htmlFor="guest">
                                    <span>guest</span>
                                    <input id="guest" type="number" placeholder="1" />
                                </label>

                            </div>
                            <div className="btn-container">
                                <div className="content">
                                    <button className="action-btn"><span>Reserve</span></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}
