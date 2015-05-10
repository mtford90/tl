var Timezone = require('./Timezone');

export default
class Home extends React.Component {
  render() {
    var timezones = [
      {
        name: 'Blah',
        timezone: 'Europe/Madrid'
      }
    ];
    return (
      <div id="timezones">
        {timezones.map(function (t) {
          return <Timezone timezone={t}/>
        })}
      </div>
    )
  }
}
