import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Workspace from 'containers/workspace'
import './styles.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path='/' component={Workspace} />
          <Redirect from='/*' to='/' />
        </Switch>
      </div>
    )
  }
}

export default App