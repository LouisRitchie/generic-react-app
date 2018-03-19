import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { scroll$ } from 'lib/observables.js'
import Rx from 'rxjs'
import './styles.css'
import Photo from 'static/leanpub.png'

const lowerLimit = 100
const upperLimit = 200
const picturePosEnd = 500
const picturePosStart = 700

const getPictureY = pageY => {
  if (pageY < lowerLimit) {
    return picturePosStart
  }

  if (pageY > upperLimit) {
    return picturePosEnd
  }
  
  return Math.max(...[
    picturePosStart - ((pageY - picturePosEnd) * 3),
    picturePosEnd,
    picturePosStart
  ])
}

class SlidingPhoto extends Component {
  state = {
    y: getPictureY(0)
  }

  componentWillMount() {
    const positionInterval$ = Rx.Observable.interval(20)
    scroll$.sample(positionInterval$).bufferTime(200).filter(arr => arr.length > 6).subscribe(scrolls => {
      const avg = scrolls.reduce((sum, {pageY}) => sum + pageY, 0) / scrolls.length
      console.log(avg) 
      //console.log(scroll.pageY, getPictureY(scroll.pageY))
      this.setState({y: getPictureY(avg)})
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.y === void 0 || this.state.y === nextState.y) {
      return false
    }

    return true
  }

  render() {
    console.log('rending with ', this.state.y)
    return (
      <img className='photo' src={Photo} style={{top: this.state.y, opacity: (700 - this.state.y) / 200}}/>
    )
  }
}

export default SlidingPhoto
