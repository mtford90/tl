var Timezone = require('./Timezone'),
  Reflux = require('reflux'),
  _ = require('underscore'),
  data = require('./data');


var Home = React.createClass({
  getInitialState: function () {
    return {
      timezones: data.timezoneStore.timezones
    }
  },
  mixins: [Reflux.listenTo(data.timezoneStore, "onTimezoneChange")],
  render() {
    var timezones = this.state.timezones;
    return (
      <div id="timezones">
        {timezones.length ? timezones.map(function (t, idx) {
          console.log('Creating timezone component', t);
          return <Timezone timezone={t} key={idx} idx={idx}/>
        }) : 'You havent created any timezones yet.'}
      </div>
    )
  },
  onTimezoneChange: function (timezones) {
    this.setState({
      timezones: _.sortBy(timezones, function (t) {
        return t.name;
      })
    })
  }
});

module.exports = Home;
