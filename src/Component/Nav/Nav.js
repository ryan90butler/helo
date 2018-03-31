import React, { Component } from 'react';
import{Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {updateID,updateProfilePicture,updateUsername} from '../../Redux/store';

const Nav = (props)=>{
  if (props.history.location.pathname == "/"){
    return null;
  }else{
  return(
    <div>
      <Link to='/dashboard'><button>Home</button></Link>
      <Link to='/post/:id'><button>New Post</button></Link>
      <Link to='/'><button>Logout</button></Link>
    </div>
  )
}
}

function mapStateToProps(state){
	return state;
}

export default withRouter(connect(mapStateToProps)(Nav));