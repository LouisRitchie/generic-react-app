import React, { Component } from 'react'
import './styles.css'

// This is a HOC that adds the lifecycle methods that handle our container transitions.
class TransitionContainer extends Component {
  componentDidMount = () => setTimeout(this.props.hitLightSwitch, 200)

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.routeName !== this.props.routeName) {
      this.props.hitLightSwitch()
      setTimeout(this.props.hitLightSwitch, 200)
    }
  }

  render() {
    const { component: Component } = this.props

    return <Component />
  }
}

export default TransitionContainer
