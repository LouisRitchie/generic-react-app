import React, { Component } from 'react'
import './styles.css'
import SlidingPhoto from 'components/slidingPhoto'

class Home extends Component {
  render() {

    console.log(__APP_CONFIG__)
    return (
      <div className="home">
        Home Container.
        <SlidingPhoto slideDistance={200} slideTo={200} image={require('../../static/leanpub.png')} />
        <SlidingPhoto slideDistance={200} slideTo={1100} image={require('../../static/reelgood2.png')} />
        <SlidingPhoto slideDistance={200} slideTo={1900} image={require('../../static/reelgood3.png')} />
      </div>
    )
  }
}

export default Home
