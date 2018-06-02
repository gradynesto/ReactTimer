var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({

  getInitialState: function () {
    return {
      count: 0,
      timerStatus: 'paused'
    };
  },
  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.timerStatus !== prevState.timerStatus) {
      switch (this.state.timerStatus) {
        case 'started':
          this.startTimer();
          break;
        case 'paused':
          break;
        case 'stopped':
          clearInterval(this.timer)
          this.timer = undefined;
          break;
      }
    }
  },
  componentWillUnmount: function () {
    clearInterval(this.timer);
    this.timer = undefined;
  },
  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count + 1;
      this.setState({
        count: newCount
      });
    }, 1000);
  },
  handleStatusChange: function (newStatus) {
    switch (newStatus) {
      case 'started':
        this.setState({
          timerStatus: 'started'
        });
        break;
      case 'stopped':
        clearInterval(this.timer)
        this.timer = undefined;
        this.setState({
          count: 0,
        });
      case 'paused':
        clearInterval(this.timer)
        this.timer = undefined;
        this.setState({
          timerStatus: 'paused'
        });
        break;
    }
  },
  render: function () {
    var { count, timerStatus } = this.state;
    var renderControlArea = () => {
      return <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange} />
    }

    return (
      <div>
        <h1 className="page-title">Timer</h1>
        <Clock totalSeconds={count} />
        {renderControlArea()}
      </div>
    );
  }

})

module.exports = Timer;