var Router = require('react-router'),
  React = require('react');

import Home from './Home';
import Tags from './Tags';
import AView from './AView';
import {Route, Redirect, NotFoundRoute, RouteHandler, Link, DefaultRoute} from 'react-router';


//class LoggedIn extends React.Component {
//  render() {
//    return (
//      <div className="ui page grid">
//        <div className="ui sixteen wide column">
//          <div className="ui menu">
//            <div className="header item">
//              <Link to="home">
//                Timezones
//              </Link>
//            </div>
//            <Link to="view" className="item">
//              <i className="icon edit"></i>
//              View
//            </Link>
//            <Link to="tags" className="item">
//              <i className="icon tags"></i>
//              Tags
//            </Link>
//          </div>
//
//          <div id="main-content" role="main" >
//            <RouteHandler/>
//          </div>
//        </div>
//      </div>
//    )
//  }
//}

class Login extends React.Component {
  submit() {

  }

  render() {
    return (
      <form className="ui six wide column centered form segment  grid">

        <h3 className="ui header centered ">Login</h3>
        <div class="ui column required field ">
          <div class="ui icon input">
            <input type="text" placeholder="Username"/>
            <i class="user icon"></i>
          </div>
        </div>
        <div class="required field">
          <div class="ui column icon input">
            <input type="password" placeholder="Password"/>
            <i class="lock icon"></i>
          </div>
        </div>

        <button className="ui submit button " type="submit" onsubmit={this.submit()}>Login</button>
        <div>
          <Link to="register" className="item">
          {'Need an account?'}
          </Link>
        </div>


      </form>
    )

  }
}

class Register extends React.Component {
  submit() {

  }

  render() {
    return (
      <form className="ui six wide column centered form segment  grid">

        <h3 className="ui header centered ">Register</h3>
        <div class="ui column required field ">
          <div class="ui icon input">
            <input type="text" placeholder="Username"/>
            <i class="user icon"></i>
          </div>
        </div>
        <div class="required field">
          <div class="ui column icon input">
            <input type="password" placeholder="Password"/>
            <i class="lock icon"></i>
          </div>
        </div>
        <div class="required field">
          <div class="ui column icon input">
            <input type="password" placeholder="Repeat Password"/>
            <i class="lock icon"></i>
          </div>
        </div>

        <button className="ui button " type="submit"  onsubmit={this.submit()}>Register</button>
           <div>
          <Link to="login" className="item">
          {'Already have an account?'}
          </Link>
        </div>

      </form>
    )

  }
}

class LoggedOut extends React.Component {

  submit() {

  }

  render() {
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
}


class App extends React.Component {
  render() {
    return (
      <div id="main-content" role="main" >
        <RouteHandler/>
      </div>
    )

  }

}

var routes = (
  <Route handler={App}>
    <Route path='/' name='user' handler={LoggedOut}>
      <Route path='register' name='register' handler={Register}/>
      <DefaultRoute name='login' handler={Login}/>
    </Route>
  </Route>
);

//<Route path='view' name='view' handler={AView}/>
Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
