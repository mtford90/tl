var React = require('react'),
  classSet = React.addons.classSet,
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
    }.bind(this));
  },
  onDonePressed: function () {
    this.setState({
      editing: false
    });
  },
  renderNotEditing: function () {
    return (
      <div className="timezone">
        <i className="ui link pencil icon edit" onClick={this.onEditPressed.bind(this)}/>
        <div className="inner-timezone">
          <header>{this.state.timezone.name}</header>
          <main>{this.state.time}</main>
          <footer className="timezone-name">{this.state.timezone.timezone}</footer>
        </div>
      </div>
    )
  },
  onNameChange: function (event) {
    this.state.timezone.name = event.target.value;
    this.forceUpdate();
  },
  renderEditing: function () {
    return (
      <div className="timezone">
        <i className="ui link cancel icon edit" onClick={this.onDonePressed.bind(this)}/>
        <div className="inner-timezone">
          <header>
            <div className="ui input name-input">
              <input name="name" type="text" placeholder="Name" value={this.state.timezone.name} onChange={this.onNameChange.bind(this)}/>
            </div>
          </header>
          <main>{this.state.time}</main>

          <footer className="timezone-name">
            <div className="ui selection dropdown" ref="dropdown">
              <input name="timezone" type="hidden" />
              <div className="text">{this.state.timezone.timezone}</div>
              <i className="dropdown icon"></i>
              <div className="menu">
              {this.state.timezoneNames.map(function (name, idx) {
                return (
                  <div className="item" data-value={idx}>{name}</div>
                )
              }.bind(this))}
              </div>
            </div>
          </footer>
        </div>
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
    this.cancelInterval = setInterval(this.getCurrentTime.bind(this), 1000);
  },
  componentWillUnmount: function () {
    this.cancelInterval();
  },
  componentWillReceiveProps: function (nextProps) {
    console.log('nextProps', nextProps);
  }
});

module.exports = Timezone;
