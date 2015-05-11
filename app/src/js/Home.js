var Timezone = require('./Timezone'),
  Reflux = require('reflux'),
  _ = require('underscore'),
  flux = require('./flux');


var Home = React.createClass({
  getInitialState: function () {
    return {
      timezones: flux.timezoneStore.timezones
    }
  },
  mixins: [Reflux.listenTo(flux.timezoneStore, "onTimezoneChange")],
  render() {
    var timezones = this.state.timezones;
    return (
      <div id="timezones">
        {timezones.length ? timezones.map(function (t, idx) {
          console.log('Creating timezone component', t);
          return <Timezone timezone={t} key={idx} idx={idx}/>
        }) : 'Nothing to show.'}
      </div>
    )
  },
  onTimezoneChange: function (timezones) {
    this.setState({
      timezones: timezones
    })
  }
});

module.exports = Home;
