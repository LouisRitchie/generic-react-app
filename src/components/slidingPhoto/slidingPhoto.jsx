import React, { Component } from 'react'
import { scroll$ } from 'lib/observables.js'
import { interval } from 'rxjs/observable/interval'
import { take } from 'rxjs/operators/take'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/sample'
import 'rxjs/add/operator/takeUntil'
import './styles.css'

class SlidingPhoto extends Component {
  /*  the initial state has the image at zero opacity and at start position, so that
   *  even if image is 1st on page, it will still slide in to view
   */
  state = {
    coefficient: 1
  }

  componentWillMount() {
    // set up the scroll position observable, which shall emit the latest scroll position every 100ms.
    this._unmount$ = (new Subject).pipe(take(1))
    this._pollScrollPosition$ = scroll$.sample(interval(100)).takeUntil(this._unmount$)

    // subscribe to the observable, so that emitted events are passed to our coefficient function.
    this._pollScrollPosition$.subscribe(scroll => (
      this.setState({
        coefficient: this._getCoefficient(scroll.pageY + document.documentElement.clientHeight)
      })
    ))
  }

  componentDidMount() {
    this.setState({ coefficient: this._getCoefficient(document.documentElement.clientHeight) })
  }

  componentWillUnmount() {
    // unsubscribe from the observable, to avoid memory leaks.
    this._unmount$.next()
  }

  _getCoefficient = pageY => {
    /*  coefficient === 0: image at full opacity and resting at final position
     *  0 < coefficient < 1: image is transitioning
     *  coefficient === 1: image at zero opacity and resting at start position.
     */
    let coefficient = (this.props.slideTo + this.props.slideDistance - pageY) / this.props.slideDistance
    
    if (coefficient < 0) {
      return 0
    }

    if (coefficient > 1) {
      return 1
    }

    return coefficient
  }

  render() {
    return (
      <img className='photo' src={this.props.image} style={{top: this.props.slideTo + (this.state.coefficient * 500), opacity: 1 - this.state.coefficient}} />
    )
  }
}

export default SlidingPhoto
