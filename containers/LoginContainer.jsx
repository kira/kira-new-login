import React from 'react';
import { connect } from 'react-redux';
import request from 'superagent';

import LoginForm from '../Components/LoginForm'
import SignupForm from '../Components/SignupForm'

import {updateUserStoreAfterLogin, updateUserStoreAfterSignup} from '../Actions/Users'
import {redirect} from '../Router/routes';

const style = {
  width: '50%',
  height: '20%',
  marginTop: 'auto',
  left: '25%',
  position: 'relative'
};

class LoginContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      signUp: false,
      failMessage: ''
    }
  }

  goTo(loc){
    redirect(loc);
  }

  reqLogin(user, pword){
    request.get(`http://localhost:3000/login`)
      .type('form')
      .send({user:user, password:pword})
      .end((err, res) => {
        if(!err && res){
          if(Object.keys(res.body).length !== 0){
            console.log(res.body);
            this.props.updateUserStoreAfterLogin(user, res.body);
            this.goTo('lobby');
          } else {
            this.setState({ failMessage: 'User Details does not exist' });
          }
        } else {
          this.reqLogin(user, pword);
          console.log(err);
        }
      });
  }

  reqUpload(user, file) {
    request.post(`http://localhost:3000/upload`)
      .type('form')
      .send({name: user, file: file})
      .end((err, res) => {
        return !err && res
      })
  }


  reqSignUp(user, pword, email, file, admin, fname, lname, pname){
    request.post(`http://localhost:3000/signup`)
      .type('form')
      .send({
              name: user,
              pword: pword,
              email: email,
              admin: admin,
              fname: fname,
              lname: lname,
              pname: pname
            })
      .end((err, res) => {
        if(!err & res){
          if (res.body.created) {
            this.props.updateUserStoreAfterSignup(user, admin, fname + ' ' + lname, pname);
            this.props.webStorage.setItem('picture', file);
            this.reqUpload(user, file);
            this.goTo('lobby');
          } else {
            if(res.body.info.type === 'email'){
              this.setState({ failMessage: 'Account with that email already exists' });
            } else if (res.body.info.type === 'name'){
              this.setState({ failMessage: 'That user name is taken' });
            }
          }
        } else {
          console.log(err);
        }
      });
  }

  signUp() {
    this.setState({signUp: true});
  }

  setFailMessage(message){
    this.setState({failMessage: message});
  }

  render(){
    return(
      this.state.signUp ?
        <SignupForm
          style={style}
          failMessage={this.state.failMessage}
          signUp={this.reqSignUp.bind(this)}
          setFailMessage={this.setFailMessage.bind(this)}
        /> :
        <LoginForm
          style={style}
          reqLogin={this.reqLogin.bind(this)}
          signUpToggle={this.signUp.bind(this)}
          failMessage={this.state.failMessage}
        />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    webStorage: state.webStorage
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserStoreAfterLogin: (user, result) => {
      dispatch(updateUserStoreAfterLogin(user, result));
    },
    updateUserStoreAfterSignup: (user, admin, fname, pname) => {
      dispatch(updateUserStoreAfterSignup(user, admin, fname, pname));
    },
  }
};

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

export default Login;
