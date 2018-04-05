import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUsername, updateProfilePicture, updateID} from '../../Redux/store';
import './Auth.css';
import helo_logo from '../../assets/helo_logo.png';

class Auth extends Component {
  constructor(props){
    super(props)
    this.state = {
        username: "",
        password:"",
        profile_pic: ""
    }
    this.handleChange = this.handleChange.bind(this);
}

  registerOrLogin(e, login){
    e.preventDefault();
    axios.post(`/api/${login}`, {
      username:this.state.username,
      password:this.state.password,
    })
        .then((response)=>{
            if(response.data.success){
              this.props.history.push('/dashboard');
            }else{
                alert("The password or your username is incorrect")
            }
        })
      .catch((err)=>{
        console.log(err)
    })
  }

  handleChange(e, action){
    switch(action){
      case 'username': this.props.dispatch(updateUsername(e.target.value));
      break;
      case 'picture' : this.props.dispatch(updateProfilePicture(e.target.value));
      break;
  }

    this.setState({
        [e.target.name]: e.target.value,
    });
}

  render() {
    return (
      <div className="login-page">
          <div className="login-form">
            <form onSubmit={(event)=>{this.registerOrLogin(event, 'login')}} >
            <img className="helo-logo" src={helo_logo} alt="helo logo"/>
            <p className="helo-logo">Helo</p>
              <div>
               <label>Username</label>
            <br/>
                <input className="login-input" name="username" value={this.state.username} onChange={e=>this.handleChange(e, `username`)} type="text"/>
              </div>
            <br/>
              <div>
                <label>Password</label>
            <br/>
                <input className="login-input" name="password" value={this.state.password} onChange={this.handleChange} type="text"/>
                </div>
                <div className="login-buttons">
                <button type="submit">Login</button>
                <button onClick={(event)=>{this.registerOrLogin(event, 'register')}} className="sign-up-button">Register</button>
              </div>
            </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps)(Auth);