import { Component } from 'react'
import { utilService } from '../../services/util.service.js'

import { DatePicker } from '../DatePicker.jsx';
import { AiFillStar } from 'react-icons/ai';





export class StayOrder extends Component {

    state = {
        stay: null,
        isDatePickerOpen: false,
        userSelection: {
            "check-in": new Date(),
            "check-out": new Date(),
            guests: 0,
            numOfNights:null
        },
    }

    componentDidMount() {
        const { stay } = this.props
        this.setState({ stay: { ...stay } })

    }

    onHandleChange = ({ target }) => {
        if (target) {
            let field = target.name
            let value = +target.value
            if (field === 'guests') {
                if (value < 0) value = 0
                else if (value > this.state.stay.capacity) value = this.state.stay.capacity
                // console.log('value', value)
            }
            this.setState((prevState) => {
                // const numOfNights = ((prevState.userSelection["check-out"]-prevState.userSelection["check-in"])/1000/60/60/24)
                return ({ ...prevState, userSelection: { ...prevState.userSelection, [field]: value } })
            })
        }
    }
    
    onSelectDate = (rangeSelection) => {
        // console.log('rangeSelection', rangeSelection)
        const numOfNights = ((rangeSelection.endDate-rangeSelection.startDate)/1000/60/60/24)
        console.log('numOfNights',numOfNights)
        
        this.setState((prevState) => {
            
            return ({ ...prevState, userSelection: { ...prevState.userSelection, "check-in": rangeSelection.startDate,"check-out": rangeSelection.endDate,numOfNights } })
    })
    }

    toggleDatePicker = ({ target }) => {
        const domRect = target.getBoundingClientRect();
        this.setState((prevState) => ({ ...prevState, isDatePickerOpen: !prevState.isDatePickerOpen }))
    }

    render() {
        const { stay, isDatePickerOpen, userSelection } = this.state
        const checkIn = userSelection['check-in'].toLocaleDateString('en-GB')
        const checkOut = userSelection['check-out'].toLocaleDateString('en-GB')
      
        if (!stay) return <h1>Loading...</h1>
        const { reviewsAvg } = this.props

        console.log(stay)
        return (
            <section className="order-container">
                <div className="order-form-container">
                    <div className="order-form">
                        <div className="order-form-header">
                            <h2>${stay.price} <span>/night</span></h2>
                            <p> <AiFillStar /> {reviewsAvg} ({stay.reviews.length} reviews)</p>

                        </div>
                        <form>
                            <div className="order-form-date">
                                <label htmlFor="check-in" onClick={this.toggleDatePicker}>
                                    <span>Check-in</span>
                                    <div className="check-in-input" >{checkIn}</div>
                                </label>
                                <label htmlFor="check-out" onClick={this.toggleDatePicker}>
                                    <span>Check-out</span>
                                    <div className="check-in-input" >{checkOut}</div>
                                </label>
                            </div>
                            <div className="order-form-guest">
                                <label htmlFor="guest">
                                    <span>guest</span>
                                    <input name="guests" id="guest" type="number" value={userSelection.guests} onChange={(ev) => this.onHandleChange(ev)} />
                                </label>

                            </div>
                            {isDatePickerOpen && <DatePicker onSelectDate={this.onSelectDate}/>}
                            {userSelection.numOfNights && <h3>{userSelection.numOfNights}</h3> }
                            <div className="btn-container">
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
                                <div class="cell"></div>
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
