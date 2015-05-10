var React = require('react'),
  api = require('./api'),
  moment = require('moment');

var Timezone = React.createClass({
  getInitialState: function () {
    var timezoneNames = moment.tz.names();

    return {
      editing: false,
      timezoneNames: timezoneNames,
      timezone: this.props.timezone
    }
  },
  onEditPressed: function () {
    this.setState({
      editing: true
    }, function () {
      var dropdownNode = this.refs.dropdown.getDOMNode();
      var $dropdownNode = $(dropdownNode);
      $dropdownNode.dropdown({
          onChange: function (idx, val) {
            this.state.timezone.timezone = val;
            this.getCurrentTime();
            this.forceUpdate();
          }.bind(this)
        }
      );
    });
  },
  onDonePressed: function (e) {
    e.preventDefault();
    this.setState({
      editing: false
    });
    var timezone = this.state.timezone;
    console.log('updating timezone', timezone);
    api.updateTimezone(timezone, function (err) {
      if (err) {
        console.error('Error updating timezone!', err);
      }
      else {
        console.info('Successfully updated timezone');
      }
    });
  },
  onDeletePressed: function () {
    var timezone = this.state.timezone;
    console.log('onDeletePressed', timezone);
    api.deleteTimezone(timezone, function (err) {
      if (err) console.error('Error deleting timezone!', err);
      else console.info('Successfully deleted timezone!');
    })
  },
  renderNotEditing: function () {
    var timezone = this.state.timezone;
    return (
      <div className="timezone">
        <div className="buttons">
          <i className="ui link pencil icon edit" onClick={this.onEditPressed}/>
          <i className="ui link cancel icon delete" onClick={this.onDeletePressed}/>
        </div>
        <div className="inner-timezone">
          <header>{timezone.name}</header>
          <main>{this.state.time}</main>
          <footer className="timezone-name">{timezone.timezone}</footer>
        </div>
      </div>
    )
  },
  onNameChange: function (event) {
    this.state.timezone.name = event.target.value;
    this.forceUpdate();
  },
  renderEditing: function () {
    var timezone = this.state.timezone;
    return (
      <div className="timezone">
        <div className="buttons">
          <i className="ui link checkmark icon edit" onClick={this.onDonePressed}/>
        </div>
        <form className="inner-timezone" onSubmit={this.onDonePressed}>
          <header>
            <div className="ui input name-input">
              <input name="name"
                type="text"
                placeholder="Name"
                value={this.state.timezone.name}
                onChange={this.onNameChange}/>
            </div>
          </header>
          <main>{this.state.time}</main>
          <footer className="timezone-name">
            <div className="ui selection dropdown" ref="dropdown">
              <input name="timezone" type="hidden" />
              <div className="text">{timezone.timezone}</div>
              <i className="dropdown icon"></i>
              <div className="menu">
                {this.state.timezoneNames.map(function (name, idx) {
                  return (
                    <div className="item" data-value={idx} key={idx}>{name}</div>
                  )
                })}
              </div>
            </div>
          </footer>
        </form>
      </div>
    )
  },
  render: function () {
    if (this.state.editing) {
      return this.renderEditing();
    }
    else {
      return this.renderNotEditing();
    }
  },
  getCurrentTime: function () {
    var time = moment().tz(this.state.timezone.timezone).format('HH:mm:ss');
    this.setState({
      time: time
    });
  },
  componentDidMount: function () {
    this.getCurrentTime();
    this.interval = setInterval(this.getCurrentTime, 1000);
  },
  componentWillUnmount: function () {
    clearInterval(this.interval);
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      timezone: nextProps.timezone
    });
  }
});

module.exports = Timezone;
