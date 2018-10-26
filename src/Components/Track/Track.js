import React from 'react';
import './Track.css';

class Track extends React.Component {
/* Determines if track function should be add (+) or remove (-) */
  renderAction = () => {
    let action;
    if (this.props.isRemoval) {
      action = <a onClick={this.removeTrack()}>-</a>;
    } else {
      action = <a onClick={this.addTrack()}>+</a>;
    }
    return action;
  }

  addTrack = () => {
    this.props.onAdd(this.props.track);
  }

  removeTrack = () => {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist}| {this.props.track.album}</p>
        </div>
          <a className="Track-action" onClick={this.renderAction}>''</a>
      </div>
    )
  }
};

export default Track;
