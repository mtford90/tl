var Router = require('react-router'),
  React = require('react');

import Home from './Home';
import Tags from './Tags';
import AView from './AView';
import {Route, Redirect, NotFoundRoute, RouteHandler, Link, DefaultRoute} from 'react-router';


class App extends React.Component {
  render() {
    return (
      <div className="ui page grid">
        <div className="ui sixteen wide column">
          <div className="ui menu">
            <div className="header item">
              <Link to="home">
                Timezones
              </Link>
            </div>
            <Link to="view" className="item">
              <i className="icon edit"></i>
              View
            </Link>
            <Link to="tags" className="item">
              <i className="icon tags"></i>
              Tags
            </Link>
          </div>

          <div id="main-content" role="main" >
            <RouteHandler/>
          </div>
          <div>
            adasd

            asdasda


            asdasd
          </div>
        </div>
      </div>
    )
  }

}

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Home}/>
    <Route path='home' name='home' handler={Home}/>
    <Route path='tags' name='tags' handler={Tags}/>
    <Route path='view' name='view' handler={AView}/>
  </Route>
);

Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
