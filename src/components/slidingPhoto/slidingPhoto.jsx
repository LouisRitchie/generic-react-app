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

class SlidingPhoto extends Component {
  state = {
    coefficient: 0,
    currentY: (this.props.index + 1) * document.documentElement.clientHeight,
    minY: (this.props.index + 0.5) * document.documentElement.clientHeight,
    maxY: (this.props.index + 1) * document.documentElement.clientHeight
  }

  componentWillMount() {
    const positionInterval$ = Rx.Observable.interval(20)
    scroll$.sample(positionInterval$).bufferTime(200).filter(arr => arr.length > 6).subscribe(scrolls => {
      const avg = scrolls.reduce((sum, {pageY}) => sum + pageY, 0) / scrolls.length + document.documentElement.clientHeight
      const coefficient = this._getCoefficient(avg)
      //console.log(scroll.pageY, this._getCoefficient(scroll.pageY))
      this.setState({
        coefficient,
        currentY: this.state.minY + (coefficient * 500)
      })
    })
  }

/*
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.y === void 0 || this.state.y === nextState.y) {
      return false
    }

    return true
  }
*/

  _getCoefficient = pageY => {
    let coefficient = (this.state.maxY - pageY) / (this.state.maxY - this.state.minY)
    console.log(coefficient)
    
    if (coefficient < 0) {
      return 0
    }

    if (coefficient > 1) {
      return 1
    }

    return coefficient
  }

  render() {
    console.log('rending with ', this.state.currentY, this.state.coefficient)
    return (
      <img className='photo' src={Photo} style={{top: this.state.currentY, opacity: 1 - this.state.coefficient}} />
    )
  }
}

export default SlidingPhoto
