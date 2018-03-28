import React, { Component } from 'react'
import { interval } from 'rxjs/observable/interval'
import { take } from 'rxjs/operators/take'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/sample'
import 'rxjs/add/operator/takeUntil'
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

  componentDidMount() {
    this.refs.drawarea.addEventListener('mousemove', event => {
      if (!this.state.dragging) {
        return
      }

      this.setState({
        coords: [
          {
            startXY: this.state.coords[0].startXY,
            lastXY: [event.x, event.y]
          },
          ...this.state.coords
        ]
      })
    })

    this.refs.drawarea.addEventListener('mousedown', event => {
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
          ...this.state.coords
        ]
      })
    })

    this.refs.drawarea.addEventListener('mouseup', event => {
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
