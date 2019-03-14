'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';


const fieldStyle = {
  width: '80%',
};

export default class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({failMessage: nextProps.failMessage});
  }

  onChange(e){
    let newState = {};
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  }

  render(){
    const failMessage = this.state.failMessage === '' ? false :
      <h5 style={{position: 'relative', color: 'red', left: '45%', marginTop: '2%' }}>
        {this.state.failMessage}
      </h5>;

    return (
      <div>
        <Paper style={this.props.style} zDepth={5} >
          <TextField
            id='username'
            style={fieldStyle}
            value={this.state.username}
            onChange={this.onChange.bind(this)}
            hintText="Login ID"
          />
          <TextField id='password'
                     style={fieldStyle}
                     value={this.state.password}
                     onChange={this.onChange.bind(this)}
                     hintText="Password Field"
                     floatingLabelText="Password"
                     type="password"
          />
          <RaisedButton
            onClick={this.props.reqLogin.bind(this, this.state.username, this.state.password)}
            label="Login" fullWidth={true}
          />
          <RaisedButton
            onClick={this.props.signUpToggle}
            label="Sign Up" fullWidth={true}
          />
          {failMessage}
        </Paper>
      </div>
    );
  }
};
