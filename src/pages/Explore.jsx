import React from 'react'
import { connect } from 'react-redux'

import { StayList } from '../cmps/StayList.jsx'
import { loadStays} from '../store/stay.action.js'


class _Explore extends React.Component {

    componentDidMount() {
        this.props.loadStays();
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.stays !== this.props.stays) {
    //         this.props.loadStays();
    //     }
    // }

    render() {
        const {stays} = this.props
        if (!stays || stays.length===0) return <React.Fragment/>
        const imgUrl = stays[0].imgUrls[0]
        return (
            <section className="explore-container">
                <img src ={imgUrl}/>
                {/* <StayList stays={stays}/> */}
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

