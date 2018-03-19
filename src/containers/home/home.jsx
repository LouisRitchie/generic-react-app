import React, { Component } from 'react'
import './styles.css'
import SlidingPhoto from 'components/slidingPhoto'

class Home extends Component {
  render() {
    return (
      <div className="home">
        Home Container.
        {/*<SlidingPhoto index={0} image={require('../../static/leanpub.png')} />*/}
        <SlidingPhoto index={1} image={require('../../static/reelgood2.png')} />
      </div>
    )
  }
}

export default Home
