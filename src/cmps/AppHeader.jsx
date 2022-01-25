import React from 'react';
import { SiAirbnb } from 'react-icons/si';
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi"
import { Link } from "react-router-dom"
import { withRouter } from 'react-router-dom';
import { SearchFilter } from './SearchFilter.jsx';
import { BiSearch } from "react-icons/bi"


class _AppHeader extends React.Component {

    state = {
        // isFullHeader: false,
        // currPage: '',
        // isHomePageTop:true
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
        // this.setState((prevState) => ({ ...prevState, currPage: this.props.currPage }))
        // if (this.props.location.pathname !== "/") this.setState({ isFullHeader: false })
        // this.onSetCurrPage()
        // console.log('props from cdm header',this.props)

    }

    // componentDidUpdate() {
    //     if (this.state.currPage !== this.props.currPage) this.setState((prevState) => ({ ...prevState, currPage: this.props.currPage }))
    //     if (this.state.isFullHeader !== this.props.isFullHeader) this.setState((prevState) => ({ ...prevState, isFullHeader: this.props.isFullHeader }))
    // }

    // onSetCurrPage = () => {
    //     let { currPage } = this.props
    //     let isFullHeader
    //     switch (currPage) {
    //         case '/':
    //             currPage = 'home'
    //             isFullHeader = true
    //             break;
    //         case '/explore':
    //             currPage = 'explore'
    //             isFullHeader = false

    //             break;
    //         case '/stay':
    //             currPage = 'stay'
    //             isFullHeader = false

    //             break;

    //         default:
    //             break;
    //     }

    //     this.setState((prevState) => ({ ...prevState, currPage,isFullHeader }), () =>  this.handleScroll() )

    // }

    handleScroll = (event) => {
        const { scrollY } = (window)
        let action = null
        // if (this.state.isFullHeader) this.setState((prevState) => ({ ...prevState, isFullHeader: false }))
        if ((scrollY < 100) && (this.props.currPage === "home")) {
            action = { isHomePageTop: true, isFullHeader: true }
            // console.log('currPage from hendel',this.state.currPage)
            // console.log('scrollY',scrollY)
            // this.props.onSetAppState({ isFullHeader: true, isHomePageTop: true })
            // this.setState((prevState) => ({ ...prevState, isFullHeader: true,isHomePageTop:true }))        
        } else {
            action = { isHomePageTop: false, isFullHeader: false }
            // this.setState((prevState) => ({ ...prevState,isHomePageTop:false,isFullHeader: false }))
        }
        if ((action.isHomePageTop !== this.props.isHomePageTop) ||
            (action.isFullHeader !== this.props.isFullHeader)) {
            this.props.onSetAppState(action)

        } 
    }


    onSearch = (searchValue) => {

        // console.log('searchValue', searchValue)
        this.props.history.push(`/explore?location=${searchValue.location}&minPrice=-Infinity&maxPrice=Infinity&checkIn=${searchValue["check-in"]}&checkOut=${searchValue["check-out"]}&guests=${searchValue.guests}`)
    }

    onOpenFullHeader = () => {
        const action = { isHomePageTop: false, isFullHeader: true }
        this.props.onSetAppState(action)

    }

    render() {
        const { location } = this.props
        // const headerBackground = (location.pathname === "/") ? "header-container" : ""
        const { isFullHeader, isHomePageTop, currPage } = this.props
        const headerColor = (isHomePageTop) ? "header-dark" : "header-bright"
        const headerLogoColor = (isHomePageTop) ? "white" : "#ff385c"
        console.log('rendered')

        return (
            <section className={`main-container ${isFullHeader ? 'full-header' : ''} ${headerColor} header-container full`}>

                <div className="header">

                    <div className="header-details">

                        <Link className='homey clean-link' to="/" color={headerLogoColor}>
                            <div className='header-left'>
                                <SiAirbnb size="2em" color={headerLogoColor} />

                            </div>
                            homey</Link>

                        {!isFullHeader && <div className='header-center' onClick={()=>this.onOpenFullHeader()}>
                            <input type="text" placeholder='Start your search' />
                            <BiSearch className='search-icon' />
                        </div>}

                        <div className='header-right'>
                            <Link className='btn-explore clean-link' to={`/explore?location=&minPrice=-Infinity&maxPrice=Infinity`} >Explore</Link>
                            {/* <button>Explore</button> */}
                            <Link className='btn-host clean-link' to="/host">Become a host</Link>
                            <button className='user-icon'><GiHamburgerMenu className='ham-icon' size="1.05rem" color="black" /><FaUserCircle color="#717171" /></button>

                        </div>
                    </div>

                    {isFullHeader && <SearchFilter onSearch={this.onSearch} />}


                </div>

            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)