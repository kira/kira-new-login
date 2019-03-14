'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';


const fieldStyle = {
  width: '80%',
};

export default class SignupForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      file: '',
      failMessage: '',
      fname: '',
      lname: '',
      fileBuffer: '',
      parsed: false,
      admin: false,
      pname: ''
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

  handleSignup(){
    if(this.validate() && this.state.parsed){
      this.props.signUp(
        this.state.username,
        this.state.password,
        this.state.email,
        this.state.fileBuffer,
        this.state.admin,
        this.state.fname,
        this.state.lname,
        this.state.pname
      );
    } else {
      if(!this.state.parsed)
        this.props.setFailMessage('Image is being processed');
      else
        this.props.setFailMessage('All text fields are required');
    }
  }

  convertFile(file){
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({parsed: true, fileBuffer: reader.result})
    };
    reader.readAsDataURL(file);
  }

  validate(){
    // Checks if any of the needed fields are empty and adds it to an array. If array length is 0 then form is valid
    const ignoreFields = ['failMessage', 'fileBuffer', 'admin', 'pname']; // remove from array if field is required
    const fields = Object.keys(this.state)
      .filter(item => ignoreFields.indexOf(item) === -1)
      .filter(item => this.state[item] === '');
    return fields.length === 0 && (this.state.password === this.state.confirmPassword);
  }

  handleChange(e){
    this.setState({parsed: false, file: e.target.files[0]});
    this.convertFile(e.target.files[0]);
  }

  handleAdmin(){
    this.setState({admin: !this.state.admin})
  }

  render(){
    const img = this.state.file === '' ? false : <img src={URL.createObjectURL(this.state.file)} style={{width: '40%'}} />;
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
          <TextField
            id='fname'
            style={fieldStyle}
            value={this.state.fname}
            onChange={this.onChange.bind(this)}
            hintText="First Name"
          />
          <TextField
            id='lname'
            style={fieldStyle}
            value={this.state.lname}
            onChange={this.onChange.bind(this)}
            hintText="Last Name"
          />
          <TextField
            id='pname'
            style={fieldStyle}
            value={this.state.pname}
            onChange={this.onChange.bind(this)}
            hintText="Preferred Name"
          />
          <TextField
            id='email'
            style={fieldStyle}
            value={this.state.email}
            onChange={this.onChange.bind(this)}
            hintText="Email Address"
          />
          <TextField id='password'
                     style={fieldStyle}
                     value={this.state.password}
                     onChange={this.onChange.bind(this)}
                     hintText="Password"
                     type="password"
          />
          <TextField id='confirmPassword'
                     style={fieldStyle}
                     value={this.state.confirmPassword}
                     onChange={this.onChange.bind(this)}
                     hintText="Confirm Password"
                     type="password"
          />
          <Checkbox
            label="I am a Professor"
            checked={this.state.admin}
            onCheck={this.handleAdmin.bind(this)}
          />
          <RaisedButton
            onClick={this.handleSignup.bind(this)}
            label="Sign Up" fullWidth={true}
          />
          <input type="file" label="Upload:" onChange={this.handleChange.bind(this)}/>
          {img}
        </Paper>
        {failMessage}
      </div>
    );
  }
}
