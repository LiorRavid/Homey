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
        const {stay} = this.state
        
        if (!stay) return <h1>Loading...</h1>
        const {reviewsAvg} = this.props

        console.log(stay)
        return (
            <section className="order-container">
                <div className="order-form-container">
                    <div className="order-form">
                        <div className="order-form-header">
                            <h2>${stay.price} <span>/night</span></h2>
                            <p>⭐ {reviewsAvg} ({stay.reviews.length} reviews)</p>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
