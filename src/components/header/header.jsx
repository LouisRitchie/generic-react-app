import React, { Component } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import routes from 'src/routes.js'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1 className="title">Generic App</h1>
        <div className="nav">
          {routes.slice(0).reverse().map(route => (
            <Link
              to={route.path}
              className={`navItem ${window.location.pathname === route.path ? 'selected' : ''}`}>
              {route.name}
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default Header
