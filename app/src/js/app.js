var Router = require('react-router'),
  React = require('react'),
  Reflux = require('reflux'),
  data = require('./data');

import Home from './Home';
import {Route, Redirect, NotFoundRoute, RouteHandler, Link, DefaultRoute} from 'react-router';
import Login from './Login';
import Register from './Register';

var LoggedIn = React.createClass({
  componentDidMount: function () {
    if (!data.userStore.user) {
      this.transitionTo('login');
    }
  },
  mixins: [Router.Navigation],
  addTimezone: function () {
    data.timezoneActions.createTimezone({
      name: 'New Timezone',
      timezone: 'Europe/London'
    });
  },
  render: function () {
    var user = data.userStore.user;
    var username = user ? user.username : '';
    return (
      <div className="ui page grid">
        <div className="ui sixteen wide column">
          <div className="ui menu">
            <div className="header item">
              <Link to="home">
                Toptal Timezones
              </Link>
            </div>
            <div className="item">
              <div className="ui transparent icon input">
                <input placeholder="Search..." type="text"/>
                <i className="search link icon"></i>
              </div>
            </div>
            <div className="item">
              <i className="plus link icon" onClick={this.addTimezone.bind(this)}></i>
            </div>
            <div className="right menu">
              <Link to="profile" className="item link">
                <i className="icon user"></i> {username }
              </Link>
            </div>
          </div>

          <div id="main-content" role="main" >
            <RouteHandler/>
          </div>
        </div>
      </div>
    )
  }
});

var LoggedOut = React.createClass({
  mixins: [Router.Navigation],
  componentDidMount: function () {
    var userStore = data.userStore;
    console.log('userStore', userStore);
    if (userStore.user) {
      this.transitionTo('app');
    }
  },
  render: function () {
    return (
      <div id="login-page">
        <div>
          <div id="login-box">
            <div className="ui column stackable center page grid">
              <h1 className="ui header centered">Toptal Timezones</h1>

              <RouteHandler/>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

var App = React.createClass({
  mixins: [Router.Navigation],
  componentDidMount: function () {
    var userStore = data.userStore;
    userStore.listen(function (user) {
      if (user) {
        console.info('New user logged in', user);
        this.transitionTo('app');
      }
      else {
        console.info('User logged out');
        this.transitionTo('login');
      }
    }.bind(this));
  },
  render: function () {
    return (
      <div id="main-content" role="main" >
        <RouteHandler/>
      </div>
    )
  }
});

var Profile = React.createClass({

  render: function () {
    var user = data.userStore.user;
    var username = user ? user.username : '';
    return (
      <div id="profile-page">
        <div>
          <b>Username:</b> {{username}}
        </div>
        <button className="ui button" id="logout-button" onClick={this.onClick.bind(this)}>Logout</button>
      </div>
    )
  },
  onClick: function () {
    data.userActions.logout();
  }

});

var routes = (
  <Route handler={App}>
    <Route path='/' name='user' handler={LoggedOut}>
      <Route path='register' name='register' handler={Register}/>
      <DefaultRoute name='login' handler={Login}/>
    </Route>
    <Route path='/app' name='app' handler={LoggedIn}>
      <Route path='profile' name='profile' handler={Profile}/>
      <DefaultRoute name='home' handler={Home}/>
    </Route>
  </Route>
);

//<Route path='view' name='view' handler={AView}/>
Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
