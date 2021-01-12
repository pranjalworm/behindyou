import React from 'react';
import { EventHandler } from '../services/event-handler.service';
import { AppEvents } from '../shared/enums';

interface FireFlyProps {
  color: FireFlyColor;
}

enum FireFlyColor {
  Yellow = 'yellow',
  DarkBlue = 'darkblue'
}

export default class FireFly extends React.Component<{}, FireFlyProps> {

  constructor(props: any) {
    super(props);

    this.state = {
      color: FireFlyColor.Yellow
    };

    EventHandler.getHandler().subscribe(AppEvents.Thinking, this.changeColor.bind(this));
  }


  changeColor(data: any) {

    const enable = data.detail;

    if (enable) {
      this.setState({ color: FireFlyColor.DarkBlue })
    } else {
      this.setState({ color: FireFlyColor.Yellow })
    }
  }


  render() {

    let colorClass = '';

    if (this.state.color === FireFlyColor.DarkBlue) {
      colorClass = 'thinking'
    }

    return (
      <div className={colorClass}>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
      </div>
    );
  }
}