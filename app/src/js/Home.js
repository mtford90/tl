var Timezone = require('./Timezone');

export default
class Home extends React.Component {
  render() {
    var timezones = [
      {}, {}, {}, {},
      {}, {}, {}, {},
      {}, {}, {}, {},
      {}, {}, {}, {},
      {}, {}, {}, {},
      {}, {}, {}, {},
      {}, {}, {}, {},
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
