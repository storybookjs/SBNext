import React, {Component} from 'react'
import Router from 'next/router'

export default class extends Component {
  postMessageListener = ({ data }) => this.go(data);

  componentDidMount() {
    window.addEventListener("message", this.postMessageListener, false);
  }
  componentWillUnmount() {
    window.removeEventListener("message", this.postMessageListener);
  }
  go (n) {
    console.log(n);
    Router.push(`/preview-${n}`)
  }

  render () {
    const { url, photos } = this.props

    console.log('3');

    return (
      <div>
        <h1>Page 3</h1>
        <button onClick={(e) => this.go(1)}>TEST</button>
      </div>
    )
  }
}
