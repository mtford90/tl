var Timezone = require('./Timezone'),
  Reflux = require('reflux'),
  data = require('./data');


var Home = React.createClass({
  mixins: [Reflux.listenTo(data.timezoneStore, "onTimezoneChange")],
  render() {
    return (
      <div id="timezones">
        {this.state.timezones.map(function (t) {
          return <Timezone timezone={t}/>
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
    })
  }
});

module.exports = Home;
