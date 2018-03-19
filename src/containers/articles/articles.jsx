import React, { Component } from 'react'
import './styles.css'
import fetch from 'isomorphic-fetch'

class Articles extends Component {
  state = {
    articles: [
      {
        title: 'Franz Ferdinand Assassinated',
        subtitle: 'WWI imminent',
        body: 'Here\'s the body of this article.'
      }
    ]
  }

  componentWillMount() {
    console.log(
      fetch('https://reddit.com')
        .then(res => res.json())
    )
  }

  render() {
    return (
      <div className="projects">
        Articles container.
      </div>
    )
  }
}

export default Articles
