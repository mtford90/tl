var Timezone = require('./Timezone'),
  Reflux = require('reflux'),
  _ = require('underscore'),
  data = require('./data');


var Home = React.createClass({
  mixins: [Reflux.listenTo(data.timezoneStore, "onTimezoneChange")],
  render() {
    return (
      <div id="timezones">
        {data.timezoneStore.timezones.length ? data.timezoneStore.timezones.map(function (t, idx) {
          console.log('Creating timezone component', t);
          return <Timezone timezone={t} key={idx} idx={idx}/>
        }) : 'You havent created any timezones yet.'}
      </div>
    )
  },
  onTimezoneChange: function () {
    this.forceUpdate();
  }
});

module.exports = Home;
