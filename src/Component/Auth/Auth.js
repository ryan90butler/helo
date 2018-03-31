import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUsername} from '../../Redux/store'

class Auth extends Component {
  constructor(props){
    super(props)
    this.state = {
        username: "",
        password:"",
    }
    this.handleChange = this.handleChange.bind(this);
}

  registerOrLogin(e, login){
    e.preventDefault();
    axios.post(`/api/${login}`, {username:this.state.username, password:this.state.password})
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

  handleChange(e){
    this.props.dispatch(updateUsername(e.target.value));
    this.setState({
        [e.target.name]: e.target.value,
    });
}

  render() {
    return (
      <div className="login-page">
        <div className="middle-section">
          <div className="login-form">
            <form onSubmit={(event)=>{this.registerOrLogin(event, 'login')}} >
              <div>
               <label>Username</label>
            <br/>
                <input className="login-input"  name="username" value={this.state.username} onChange={e=>this.handleChange(e)} type="text"/>
              </div>
            <br/>
              {/* <div>
                <label>Password</label>
            <br/>
                <input className="login-input" name="password" value={this.state.password} onChange={this.handleChange} type="text"/>
                </div> */}
                <div className="login-buttons">
                <button type="submit">Login</button>
                <button onClick={(event)=>{this.registerOrLogin(event, 'register')}} className="sign-up-button">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps)(Auth);