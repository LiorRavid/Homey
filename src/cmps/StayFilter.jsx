import React from 'react'

import { stayService } from '../services/stay.service.js';

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


    onSetFilter = (ev) => {
        ev.preventDefault()
        let { filterBy } = this.state
        console.log('the new filter', filterBy)
        this.props.onSetFilter(filterBy)
    }


    render() {
        let { location,minPrice,maxPrice } = this.state.filterBy
        return (
            <section className="state-filter flex">
                
            </section>

        )
    }

}