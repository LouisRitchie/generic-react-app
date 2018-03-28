import React, { Component } from 'react'
import { interval } from 'rxjs/observable/interval'
import { take } from 'rxjs/operators/take'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/sample'
import 'rxjs/add/operator/takeUntil'
import './styles.css'

import './styles.css'

class Footer extends Component {
  

  render() {
    return (
      <div className="drawingArea">
        Draw
      </div>
    )
  }
}

export default Footer
