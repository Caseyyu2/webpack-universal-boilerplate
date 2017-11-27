import React from 'react';
import GSAP from 'react-gsap-enhancer';
import { TimelineMax, TweenLite, Elastic } from 'gsap';

function createAnim() {
  const box = document.getElementById('box');
  const box1 = document.getElementById('box1');

  const timelineM = new TimelineMax();
  timelineM.to(box, 1, { scale: 1.25, y: '+120' });
  timelineM.to(box, 1, { scale: 1, y: '0', rotation: 90 });

  const tween1 = TweenLite.to(box1, 1, { scale: 1.23, y: '-120' });
  const tween2 = TweenLite.to(box1, 1, { scale: 1, y: '0', rotation: 90 }, 1);

  timelineM.add([tween1, tween2], '', '', 1);

  return timelineM;
}

function elasticJump(moveX, moveY) {
  const timeLineM = new TimelineMax();
  const ball = document.getElementById('circle');
  console.log(moveX, moveY);
  timeLineM.to(ball, 0.2, { x: moveX - 63, y: moveY - 63, ease: Elastic.easeOut });

  return timeLineM;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 300, y: 300 };
    this.isAnimationAdded = false;
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    this.jumpAnim = this.addAnimation(createAnim);
  }

  handleOnClick(event) {
    // Probably should only add once?
    if (!this.isAnimationAdded) {
      this.addAnimation(elasticJump);
      this.isAnimationAdded = true;
    }

    return elasticJump(event.clientX, event.clientY);
  }

  render() {
    // TODO: utilize incorporating state into animation
    const { x, y } = this.state;

    const style = {
      backgroundColor: 'pink',
      width: 123,
      height: 123,
    };

    const canvasStyle = {
      width: '100%',
      height: '100vh',
      display: 'flex',
    };

    const containerStyle = {
      display: 'flex',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: x,
      left: y,
    };

    const circleStyle = {
      width: 123,
      height: 123,
      borderRadius: 63,
      backgroundColor: '#dbdad5',
      position: 'absolute',
    };

    return (
      <div id={'canvas'} style={canvasStyle} onClick={this.handleOnClick} role={'button'} tabIndex={-1} >
        <div id={'container'} style={containerStyle}>
          <div id={'box'} style={style} />
          <div id={'box1'} style={Object.assign({}, style, { backgroundColor: 'grey' })} />
        </div>
        <div id={'circle'} style={circleStyle} />
      </div>
    );
  }
}

const ConnectedApp = GSAP()(App);
export default ConnectedApp;
