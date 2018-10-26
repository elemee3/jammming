import React from 'react';
import './Track.css';

class Track extends React.Component {
/* Determines if track function should be add (+) or remove (-) */
  renderAction = () => {
    let actions = ['', '']
    if (this.props.isRemoval) {
      actions[0] = this.removeTrack();
      actions[1] = '-';
    } else {
      actions[0] = this.addTrack();
      actions[1] = '+';
    }
    return actions;
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
          <p>{this.props.track.artist} {this.props.track.album}</p>
        </div>
          <a className="Track-action" onClick={this.renderAction[0]}>{this.renderAction[1]}</a>
      </div>
    )
  }
};

export default Track;
