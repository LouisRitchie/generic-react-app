import React, { Component } from 'react'
import { scroll$ } from 'lib/observables.js'
import { Observable } from 'rxjs'
import { interval } from 'rxjs/observable/interval'
import { map, take, takeUntil, sample } from 'rxjs/operators'
import 'rxjs/add/operator/sample'
import { Subject } from 'rxjs/Subject'
/*
import 'rxjs/add/operator/sample'
import 'rxjs/add/operator/takeUntil'
*/
import './styles.css'

import './styles.css'

class Footer extends Component {
  state = {
    dragging: false,
    coords: [
      {
        startXY: [0, 0],
        lastXY: [0, 0]
      }
    ]
  }

  subscribeToStuff = event => {

  }

  componentDidMount() {
    this._unmount$ = (new Subject()).pipe(take(1))
    this._mouseMove$ = Observable.fromEvent(this.refs.drawarea, 'mousemove').pipe(takeUntil(this._unmount$))
    this._mouseDown$ = Observable.fromEvent(this.refs.drawarea, 'mousedown').pipe(takeUntil(this._unmount$))
    this._mouseUp$ = Observable.fromEvent(this.refs.drawarea, 'mouseup').pipe(takeUntil(this._unmount$))

    this._mouseMove$.subscribe(
      event => {
        if (!this.state.dragging) {
          return
        }

        this.setState({
          coords: [
            {
              startXY: this.state.coords[0].startXY,
              lastXY: [event.x, event.y]
            },
            ...this.state.coords.split(0, 100)
          ]
        })
      }
    )
    console.log('hello')

    this._mouseDown$.subscribe(event => {
      this.setState({
        dragging: true,
        coords: [
          {
            startXY: [event.x, event.y],
            lastXY: [event.x, event.y]
          },
          {
            startXY: [event.x, event.y],
            lastXY: [event.x, event.y]
          },
          ...this.state.coords.split(0, 100)
        ]
      })
    })

    this._mouseUp$.subscribe(event => {
      this.setState({ dragging: false })
    })

  }

  getTLHW = (startXY, lastXY) => {
    let result = [] // [top, left, height, width]

    if (startXY[0] > lastXY[0]) {
      result[1] = lastXY[0]
      result[3] = startXY[0] - lastXY[0]
    } else {
      result[1] = startXY[0]
      result[3] = lastXY[0] - startXY[0]
    }

    if (startXY[1] > lastXY[1]) {
      result[0] = lastXY[1]
      result[2] = startXY[1] - lastXY[1]
    } else {
      result[0] = startXY[1]
      result[2] = lastXY[1] - startXY[1]
    }

    return { top: result[0], left: result[1], height: result[2], width: result[3] }
  }

  render() {
    const { dragging } = this.state
    const { startXY, lastXY } = this.state.coords[0]

    return (
      <div ref='drawarea' onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} className='drawingArea'>
        {this.state.coords.map(({startXY, lastXY}) => (
          <div style={this.getTLHW(startXY, lastXY)} className='drawing' />
        ))}
      </div>
    )
  }
}

export default Footer
