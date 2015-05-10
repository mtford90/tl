var Timezone = require('./Timezone'),
  Reflux = require('reflux'),
  _ = require('underscore'),
  data = require('./data');


var Home = React.createClass({
  mixins: [Reflux.listenTo(data.timezoneStore, "onTimezoneChange")],
  render() {
    return (
      <div id="timezones">
        {this.state.timezones.map(function (t, idx) {
          return <Timezone timezone={t} key={idx}/>
        })}
      </div>
    )
  },
  getInitialState: function () {
    return {
      timezones: data.timezoneStore.timezones
    };
  },
  onTimezoneChange: function (timezones) {
    this.setState({
      timezones: timezones
    });
  }
});

module.exports = Home;
