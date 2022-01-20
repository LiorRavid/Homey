import React from 'react'
import { Switch, Route } from 'react-router'
import routes from './routes.js'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

export class RootCmp extends React.Component {
    render() {
        return (
            <section className="main-container">
                <AppHeader/>
                <main>
                    <Switch>
                        {routes.map(route=> <Route key={route.path} exact component={route.component} path={route.path} /> )}
                    </Switch>
                </main>
                {/* <AppFooter /> */}
            </section>
        )
    }
}