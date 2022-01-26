
import React from 'react'
import { BiSearch } from "react-icons/bi"


export class SearchFilter extends React.Component {

    state = {
        location: '',
        "check-in": '',
        "check-out": '',
        guests:''
    }

    onSubmitSearch = () => {
        // console.log(this.props)
        const searchValue = {...this.state}
        this.props.onSearch(searchValue)
    }
    
    onHandleChange = ({target}) => {
        // console.log(ev.target.value)
        if (target) {
            const field = target.name
            const value = target.value
            this.setState((prevState) => ({...prevState,[field]:value }))
        } 
    }

    render() {

        return (
            <form className="header-filter">
                {/* <form > */}
                <div className="filter-container">


                    <label htmlFor="location">
                        <span>Location</span>
                        <input name="location" autoComplete="off" id="location" type="text" placeholder="Where are you going?" onChange={(ev)=>this.onHandleChange(ev)}/>
                    </label>
                    <label htmlFor="check-in">
                        <span>Check in</span>
                        <input name="check-in" id="check-in" autoComplete="off" placeholder="Add dates" type="date" onChange={(ev)=>this.onHandleChange(ev)}/>
                    </label>
                    <label htmlFor="check-out">
                        <span>Check out</span>
                        <input name="check-out" id="check-out" autoComplete="off" placeholder="Add dates" type="date" onChange={(ev)=>this.onHandleChange(ev)}/>
                    </label>
                    <label className="guests" htmlFor="guests">
                        <span>Guests</span>
                        <input name="guests" id="guests" placeholder="Add guests" type="number" onChange={(ev)=>this.onHandleChange(ev)}/>
                    </label>

                    <div onClick={()=>this.onSubmitSearch()}><BiSearch className='search-icon' /></div>
                </div>
                {/* </form> */}
            </form>
        )
    }
}
