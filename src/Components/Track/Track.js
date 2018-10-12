import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
/* Bind this to renderAction, addTrack, and removeTrack */
    this.renderAction = this.renderAction.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
/* Determines if track function should be add (+) or remove (-) */
  renderAction() {
    if (this.props.isRemoval) {
      <a onClick={this.removeTrack}>-</a>
    } else {
      <a onClick={this.addTrack}>+</a>
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>this.props.track.name</h3>
          <p>this.props.track.artist | this.props.track.album</p>
        </div>
          <a className="Track-action" onClick={this.renderAction}>''</a>
      </div>
    )
  }
};

export default Track;
