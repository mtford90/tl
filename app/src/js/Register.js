var React = require('react'),
  cx = React.addons.classSet,
  flux = require('./flux'),
  api = require('./api');

import {Link} from 'react-router';


export default
class Register extends React.Component {
  constructor(props) {
    this.state = {error: null, fieldErrors: {}};
  }

  validateFields() {
    if (!this.state.username) {
      this.state.fieldErrors.username = true;
      this.state.error = 'Must supply a username';
      this.setState(this.state);
      return false;
    } else delete this.state.fieldErrors.username;
    if (!this.state.password) {
      this.state.fieldErrors.password = true;
      this.state.error = 'Must supply a password';
      this.setState(this.state);
      return false;
    } else delete this.state.fieldErrors.password;
    if (this.state.password != this.state.repeatPassword) {
      this.state.fieldErrors.repeatPassword = true;
      this.state.error = 'Passwords do not match';
      this.setState(this.state);
      return false;
    }
    else {
      delete this.state.fieldErrors.repeatPassword;
    }
    return true;
  }

  submit(e) {
    e.preventDefault();
    if (this.validateFields()) {
      this.setState({
        error: null
      }, function () {
        api.register(this.state.username, this.state.password, function (err, user) {
          if (err) {
            console.error('Error registering', err);
            this.setState({
              error: err
            });
          }
          else {
            console.info('Successful registration', user);
          }
        }.bind(this))
      }.bind(this));
    }
  }

  handleChange(event) {
    var input = event.target;
    var name = input.getAttribute('name');
    var state = {};
    state[name] = input.value;
    this.setState(state);
  }

  getFieldClasses(fieldName) {
    if (this.state.fieldErrors[fieldName]) {
      return cx('required', 'field', 'error');
    }
    else {
      return cx('required', 'field');
    }
  }

  render() {
    if (this.state.error) {
      var error = (
        <div className="ui negative message">
          <p>{this.state.error}</p>
        </div>
      );
    }
    else {
      error = '';
    }
    return (
      <form className="ui six wide column centered form segment  grid" onSubmit={this.submit.bind(this)}>

        <h3 className="ui header centered ">Register</h3>
        {error}
        <div className={this.getFieldClasses('username')}>
          <div className="ui column icon input">
            <input type="text" placeholder="Username" name="username" onChange={this.handleChange.bind(this)}/>
            <i className="user icon"></i>
          </div>
        </div>
        <div className={this.getFieldClasses('password')}>
          <div className="ui column icon input">
            <input type="password" placeholder="Password" name="password" onChange={this.handleChange.bind(this)}/>
            <i className="lock icon"></i>
          </div>
        </div>
        <div className={this.getFieldClasses('repeatPassword')}>
          <div className="ui column icon input">
            <input type="password" placeholder="Repeat Password" name="repeatPassword" onChange={this.handleChange.bind(this)}/>
            <i className="lock icon"></i>
          </div>
        </div>

        <button className="ui button " type="submit">Register</button>
        <div className="ui column input account">
          <Link to="login" className="item">
          {'Already have an account?'}
          </Link>
        </div>

      </form>
    )

  }
}
