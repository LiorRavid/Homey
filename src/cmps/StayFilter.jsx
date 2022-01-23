import React from 'react'
import Button from '@mui/material/Button'
import { FilterSlider } from './FilterSlider.jsx'

import { Link } from 'react-router-dom'

export class Filter extends React.Component {

    state = {
        filterBy: {
            minPrice: -Infinity,
            maxPrice: Infinity,
            location: '',
        },
        isPriceOpen: false,
        currPriceVal:[0,500]

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

    onSetPriceRange = (newVal)=>{
        this.setState((prevState) => ({ ...prevState, currPriceVal: newVal }));
    }

    onHandleChange = (ev,newVal)=>{
        ev.stopPropagation();
        this.setState((prevState) => ({ ...prevState, currPriceVal: newVal }));
    }

    onClearPrice = (ev) =>{
        ev.stopPropagation();
        this.setState((prevState) => ({ ...prevState, currPriceVal: [0,500]}));
    }

    onSavePrice = (ev) =>{
        ev.stopPropagation();
        this.setState((prevState) => ({ ...prevState, filterBy:{...this.state.filterBy, minPrice:this.state.currPriceVal[0],maxPrice:this.state.currPriceVal[1]} ,isPriceOpen: !prevState.isPriceOpen }),()=>{
            this.props.onSetPriceRange(this.state.filterBy)
        })
    }


    render() {
        let { location, minPrice, maxPrice } = this.state.filterBy;
        const { isPriceOpen,currPriceVal } = this.state;
        return (
            <React.Fragment>
                <section className="stay-filter flex">
                    {/* <input type="text" name="location" value={location} onChange={this.onHandleChange} />
                    <input type="number" name="minPrice" value={minPrice} onChange={this.onHandleChange} />
                    <input type="number" name="maxPrice" value={maxPrice} onChange={this.onHandleChange} />
                    <Link to={`/explore?location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}`}>Link</Link> */}
                    <Button variant="outlined">
                        <div className="btn-expand" onClick={() => this.onOpenModal('price')}>Price</div>
                        {isPriceOpen && 
                            (<div className='price-filter-modal'>
                                <FilterSlider onSetPriceRange={this.onSetPriceRange}/>
                                <div className="price-select-container">
                                    <div className="price-select">
                                        <div className="label">min price</div>
                                        <div className="price-change">
                                            <div className="dollar">$</div>
                                            <input value={currPriceVal[0]} onChange={(ev,newVal)=>this.onHandleChange(ev,newVal)} />
                                        </div>
                                    </div>
                                    <h3>–</h3>
                                    <div className="price-select">
                                        <div className="label">max price</div>
                                        <div className="price-change">
                                            <div className="dollar">$</div>
                                            <input value={currPriceVal[1]} onChange={(ev,newVal)=>this.onHandleChange(ev,newVal)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="price-save">
                                    <div className="clear" onClick={(ev)=>this.onClearPrice(ev)}>Clear</div>
                                    <div className="save" onClick={(ev)=>this.onSavePrice(ev)}>Save</div>
                                </div>
                            </div>)}
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
                </section >
            </React.Fragment >
        )
    }

}


