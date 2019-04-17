import * as React from 'react';

export default class Spinner extends React.Component {
  render() {
    return (
      <div className="app__spinner">
        <div className="spinner"></div>
      </div>
    )
  }
}