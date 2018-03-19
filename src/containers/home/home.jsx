import React, { Component } from 'react'
import './styles.css'
import SlidingPhoto from 'components/slidingPhoto'

class Home extends Component {
  render() {
    return (
      <div className="home">
        Home Container.
        <SlidingPhoto image={require('../../static/leanpub.png')} />
      </div>
    )
  }
}

export default Home
