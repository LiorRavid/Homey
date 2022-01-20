import React from 'react'
import {Link} from 'react-router-dom'

export class Filter extends React.Component {

    state = {
        filterBy: {
            minPrice:-Infinity,
            maxPrice:Infinity,
            location:'',
        },
    }


    onHandleChange = (ev) => {
        console.log('the ev ', ev)
        if (ev.target) {
            const { target } = ev
            const field = target.name
            const value = target.value
            this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => { console.log('state after select', this.state) })
        } else if (ev) {
            const labels = ev.map(option => option.value.toLowerCase())
            this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, labels } }))
        }
    }


    render() {
        let { location,minPrice,maxPrice } = this.state.filterBy
        return (
            <section className="state-filter flex">
                <input type="text" name="location" value={location} onChange={this.onHandleChange} />
                <input type="number" name="minPrice" value={minPrice} onChange={this.onHandleChange} />
                <input type="number" name="maxPrice" value={maxPrice} onChange={this.onHandleChange} />
                <Link to={`/explore?location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}`}>Link</Link>
            </section>

        )
    }

}
