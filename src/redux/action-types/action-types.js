import React, { Component } from 'react'

export default class App extends Component {
    render() {
        return (
            <Router>
            <Switch>
              {routes.map((route, index) => {
                return <Route {...route} key={index} />;
              })}
            </Switch>
          </Router>
        )
    }
}
