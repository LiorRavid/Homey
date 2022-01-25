import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadStays } from '../../store/stay.action.js'
import { reviewService } from '../../services/review.service.js'

class _TopRated extends React.Component {

    state = {
        topRatedStays : []
    }

    componentDidMount() {
       this.getTopRatedStays()
    }

    getTopRatedStays = () =>{
        this.props.loadStays()
        setTimeout(() => {
            
            let {stays} = this.props
            stays.sort( (a,b) => {
                return a.price.length - b.reviews.length
            })
            stays = stays.slice(0,4)
            this.setState({topRatedStays:stays})
        }, 3000);
       
        
     
    }
    
    
    render(){
        const {topRatedStays} = this.state
        console.log('topRatedStays:', topRatedStays);
        
    
        return (
            
            <main className="top-cities-gallery">
            
            <h1>Top Rated homies</h1>
           
           <section className='top-cities'>

               {
                   topRatedStays.map((stay,index) =>
                    <Link key={index} to={`/explore?location=${stay.loc.country}&minPrice=-Infinity&maxPrice=Infinity`}  className="top-cities-card clean-link">
                    <img src={stay.imgUrls[0]} alt="TopCities" />
                    <div className="city-details-container">
                        <h3>{stay.loc.city}</h3>
                        <div className="city-details">
                        <h4>{stay.loc.country}</h4>
                        </div>
                        </div>
                        </Link>
                    )
               }

            {/* <Link to={`/explore?location=Bangkok&minPrice=-Infinity&maxPrice=Infinity`}  className="top-cities-card clean-link">
                <img src="https://res.cloudinary.com/dxdtpxsax/image/upload/v1642760367/airbnb/pop-des/uwlmwbvado6u2qhqtky8.jpg" alt="TopCities" />
                <div className="city-details-container">
                    <h3>Bangkok</h3>
                    <div className="city-details">
                    <h4>Thailand</h4>
                    </div>
                    </div>
                    </Link>
            <Link to={`/explore?location=Madrid&minPrice=-Infinity&maxPrice=Infinity`}  className="top-cities-card clean-link">
                <img src="https://res.cloudinary.com/dxdtpxsax/image/upload/v1642760507/airbnb/pop-des/bkq1qhmroiuqdogiy3x1.jpg" alt="TopCities"/>
                <div className="city-details-container">
                    <h3>Madrid</h3>
                    <div className="city-details">
                    <h4>Spain</h4>
                    </div>
                </div>
            </Link> */}
           </section>
        </main>
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
}


export const TopRated = connect(mapStateToProps, mapDispatchToProps)(_TopRated)
