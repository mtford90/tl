var React = require('react'),
  api = require('./api');

import {Link} from 'react-router';

export default
class Login extends React.Component {

  constructor(props) {
    this.state = {error: null, loading: false};
  }

  submit(e) {
    e.preventDefault();
    if (this.state.username && this.state.password) {
      this.setState({
        error: null
      }, function () {
        this.setState({loading: true});
        api.login(this.state.username, this.state.password, function (err, data) {
          if (err) {
            this.setState({error: err});
          }
          else {
            console.info('Successful login', data);
          }
        }.bind(this))
      }.bind(this));
    }
    else {
      this.setState({
        error: 'You must provide both username and password.'
      });
    }
  }

  handleChange(event) {
    var input = event.target;
    var name = input.getAttribute('name');
    var state = {};
    state[name] = input.value;
    this.setState(state);
  }

  render() {
    if (this.state.error) {
      var error = <div className="ui negative message">
        <p>{this.state.error}</p>
      </div>
    }
    else {
      error = '';
    }
    return (
      <form className="ui six wide column centered form segment  grid" onSubmit={this.submit.bind(this)}>

        <h3 className="ui header centered ">Login</h3>
        {error}
        <div className="ui column icon input">
          <div className="ui icon input">
            <input type="text" placeholder="Username" name='username' onChange={this.handleChange.bind(this)} disabled={this.state.disabled}/>
            <i className="user icon"></i>
          </div>
        </div>
        <div className="required field">
          <div className="ui column icon input">
            <input type="password" placeholder="Password" name='password' onChange={this.handleChange.bind(this)} disabled={this.state.disabled}/>
            <i className="lock icon"></i>
          </div>
        </div>

        <button className="ui submit button " type="submit">Login</button>

        <div className="ui column input account">
          <Link to="register" className="item">
          {'Need an account?'}
          </Link>
        </div>
      </form>
    )
  }
}
