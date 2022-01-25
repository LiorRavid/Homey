import React from 'react'
import { connect } from 'react-redux'

import { Switch, Route } from 'react-router'
import routes from './routes.js'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { setCurrPage, setAppState } from './store/app.action.js'


class _RootCmp extends React.Component {

    onSetAppState = (state) => {
        this.props.setAppState(state)
    }

    render() {
        const { isFullHeader, currPage, isHomePageTop } = this.props
        console.log('state from store in root',this.props)
        return (
            <section>
                <AppHeader isFullHeader={isFullHeader}
                    currPage={currPage}
                    isHomePageTop={isHomePageTop}
                    onSetAppState={this.onSetAppState} />
                <main className="main-container page">
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
                <AppFooter />
            </section>
        )
    }
}

function mapStateToProps({ appModule }) {
    return {
        isFullHeader: appModule.isFullHeader,
        currPage: appModule.currPage,
        isHomePageTop: appModule.isHomePageTop

    }
}

const mapDispatchToProps = {
    setCurrPage,
    setAppState
}


export const RootCmp = connect(mapStateToProps, mapDispatchToProps)(_RootCmp)