import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import routes from 'src/routes.js'
import DrawingArea from 'components/drawingArea'
import './styles.css'

class App extends Component {
  render() {
    return (
      <div className="app">

        <Switch>
          <Route path='/' component={DrawingArea} />
          <Redirect from='/*' to='/' />
        </Switch>

      </div>
    )
  }
}

export default App
