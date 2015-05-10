var React = require('react');

var Timezone = React.createClass({
  onEditPressed: function () {

  },
  renderNotEditing: function () {
    return (
      <div className="timezone">
        <i className="ui link pencil icon edit" onClick={this.onEditPressed.bind(this)}/>
        <div className="inner-timezone">
          <header>Timezone Name!!!!!!!!!!!</header>
          <main>19:34</main>
          <footer className="timezone-name">Europe/London (GMT+1)</footer>
        </div>
      </div>
    )
  },
  render: function () {
    return this.renderNotEditing();
  },
  componentDidMount: function () {

  },
  componentWillReceiveProps: function (nextProps) {

  }
});

module.exports = Timezone;
