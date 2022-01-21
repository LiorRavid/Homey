import React from 'react'
import Button from '@mui/material/Button'

import { Link } from 'react-router-dom'

export class Filter extends React.Component {

    state = {
        filterBy: {
            minPrice: -Infinity,
            maxPrice: Infinity,
            location: '',
        },
        isPriceOpen: false,

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
            this.setState((prevState) => ({ ...prevState, filterBy: { ...prevState.filterBy, labels } }))
        }
    }

    onOpenModal = (type) => {
        switch (type) {
            case 'price':
                this.setState((prevState) => ({ ...prevState, isPriceOpen: !prevState.isPriceOpen }))
                break;

            default:
                break;
        }
    }


    render() {
        let { location, minPrice, maxPrice } = this.state.filterBy
        const { isPriceOpen } = this.state
        return (
            <React.Fragment>
                <section className="stay-filter flex">
                    {/* <input type="text" name="location" value={location} onChange={this.onHandleChange} />
                    <input type="number" name="minPrice" value={minPrice} onChange={this.onHandleChange} />
                    <input type="number" name="maxPrice" value={maxPrice} onChange={this.onHandleChange} />
                    <Link to={`/explore?location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}`}>Link</Link> */}
                    <Button variant="outlined" onClick={() => this.onOpenModal('price')}>
                        <span className="btn-txt">Price</span>
                        {isPriceOpen && <div className='price-filter-modal'></div>}
                    </Button>
                    <Button variant="outlined">Type of place</Button>
                    <Button variant="outlined">Property type</Button>
                    <Button variant="outlined">Wifi</Button>
                    <Button variant="outlined">TV</Button>
                    <Button variant="outlined">Kitchen</Button>
                    <Button variant="outlined">AC</Button>
                    <Button variant="outlined">Smoking allowed</Button>
                    <Button variant="outlined">Pets allowed</Button>
                    <Button variant="outlined">Filters</Button>
                </section>
            </React.Fragment>
        )
    }

}


