import React from 'react'
import { connect } from 'react-redux'

import { StayList } from '../cmps/StayList.jsx'
import{Filter} from '../cmps/StayFilter.jsx'
import { loadStays,setFilter} from '../store/stay.action.js'


class _Explore extends React.Component {

    componentDidMount() {
        this.props.loadStays();
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.stays !== this.props.stays) {
    //         this.props.loadStays();
    //     }
    // }

    // onSetFilter = (filterBy) => {

    //     console.log('the new filter', filterBy)
    //     this.props.setFilter(filterBy)
    // }

    render() {
        const {stays} = this.props
        const trip = ''
        if (!stays || stays.length===0) return <React.Fragment/>
        const imgUrl = stays[0].imgUrls[0]
        return (
            <section className="explore-container">
                <span>{stays.length} stays</span>
                <h1>Find place to stay</h1>
                {/* <Filter onSetFilter={this.onSetFilter}/> */}
                <StayList stays={stays}/>
            </section>
        )
    }
}

function mapStateToProps({ stayModule }) {
    return {
        stays: stayModule.stays,
    }
}

const mapDispatchToProps = {
    loadStays,
    // setFilter
}


export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)

