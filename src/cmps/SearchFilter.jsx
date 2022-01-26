
import React from 'react'
import { BiSearch } from "react-icons/bi"



export class SearchFilter extends React.Component {

    state = {
        location: '',
        "check-in": '',
        "check-out": '',
        guests: '',
        first: true,
        second: true,
        third: true
    }

    onSubmitSearch = () => {
        const searchValue = { ...this.state }
        this.props.onSearch(searchValue)
    }

    onHandleChange = ({ target }) => {
        console.log(target.value)
        if (target) {
            const field = target.name
            const value = target.value
            this.setState((prevState) => ({ ...prevState, [field]: value }), () => { console.log('state in search', this.state) })
        }
    }

    onHover = (prev, next) => {
        this.setState(prevState => ({ ...prevState, [prev]: !this.state[prev], [next]: !this.state[next] }))
    }

    onLeaveHover = (prev, next) => {
        this.setState(prevState => ({ ...prevState, [prev]: !this.state[prev], [next]: !this.state[next] }))
    }



    render() {
        return (
            <form className="header-filter">
                <div className="filter-container">
                    <label htmlFor="location" onMouseEnter={() => this.onHover('first', null)} onMouseLeave={() => this.onLeaveHover('first', null)}>
                        <span>Location</span>
                        <input name="location" autoComplete="off" id="location" type="text" placeholder="Where are you going?" onChange={(ev) => this.onHandleChange(ev)} />
                    </label>
                    <div className={`border ${this.state.first ? 'first' : undefined}`}></div>
                    <label htmlFor="check-in" onMouseEnter={() => this.onHover('first', 'second')} onMouseLeave={() => this.onLeaveHover('first', 'second')}>
                        <span>Check in</span>
                        <input name="check-in" id="check-in" autoComplete="off" placeholder="Add dates" type="date" onChange={(ev) => this.onHandleChange(ev)} />
                    </label>
                    <div className={`border ${this.state.second ? 'second' : undefined}`}></div>
                    <label htmlFor="check-out" onMouseEnter={() => this.onHover('second', 'third')} onMouseLeave={() => this.onLeaveHover('second', 'third')}>
                        <span>Check out</span>
                        <input name="check-out" id="check-out" autoComplete="off" placeholder="Add dates" type="date" onChange={(ev) => this.onHandleChange(ev)} />
                    </label>
                    <div className={`border ${this.state.third ? 'third' : undefined}`}></div>
                    <label className="guests" htmlFor="guests" onMouseEnter={() => this.onHover('third', null)} onMouseLeave={() => this.onLeaveHover('third', null)}>
                        <span>Guests</span>
                        <input name="guests" id="guests" name="guests" placeholder="Add guests" type="number" onChange={(ev) => this.onHandleChange(ev)} />
                    </label>

                    <div onClick={() => this.onSubmitSearch()}><BiSearch className='search-icon' /></div>
                </div>
            </form>
        )
    }
}
