import React, { Component } from 'react';
import{Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateID,updateProfilePicture,updateUsername} from '../../Redux/store';
import './Nav.css';
import { bindActionCreators} from 'redux';
import home_logo from '../../assets/home_logo.png';
import new_logo from '../../assets/new_logo.png';
import no_image from '../../assets/no_image.jpg';
import search_logo from '../../assets/search_logo.png';
import shut_down from '../../assets/shut_down.png';


// const Nav = (props)=>{
//   if (props.history.location.pathname == "/"){
//     return null;
//   }else{
//   return(
//     <div className="nav-box">
//       {props.updateUsername}

//       <Link to='/dashboard'><button>Home</button></Link>
//       <Link to='/post/:id'><button>New Post</button></Link>
//       <Link to='/'><button>Logout</button></Link>
//     </div>
//   )
// }
// }

// function mapStateToProps(state){
// 	return state;
// }

// export default withRouter(connect(mapStateToProps)(Nav));


class Nav extends Component {
  constructor(props){
    super(props)
    this.state = {
      profilePicture: '',
      updateID: ''
  }

  this.sessionDestroy = this.sessionDestroy.bind(this);

  }

  componentWillMount(){
   updateProfilePicture()
        .then(items => {
          this.props.dispatch(updateID(items.data[0].id))
          console.log(this.props)
           this.setState({
               profilePicture: items.data[0].profile_pic,
           })
        })
  //  updateID()
  //       .then(items => {
  //          this.setState({
  //              profilePicture: items.data[0].profile_pic
  //          })
  //       })
  }

  sessionDestroy(){
    axios.get(`/api/logout`)
    .then((response) => {
        if(response.data.success){
        this.props.history.push('/');
    }else{
        alert("unable to logout")
    }
})
}

  render(){
  if (this.props.location.pathname == '/'){
    return null;
  }else{
  return(
    <div className="nav-box">
    <div className="user-info">
      <img className="user-image"src={this.state.profilePicture}/>
      {this.props.updateUsername}
      {this.props.updateID}
      </div>
      <div className="nav-top-buttons">
      <Link to='/dashboard'><img className="nav-button" src={home_logo}/></Link>
      <Link to='/post/:id'><img className="nav-button" src={new_logo}/></Link>
      </div>
      <button className="nav-logout-button" onClick={this.sessionDestroy}><img className="logout-button" src={shut_down}/></button>
    </div>
  )
}
}
}

function mapStateToProps(state){
	return state;
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({updateID, updateProfilePicture, updateUsername}, dispatch);
}

export default withRouter(connect(mapStateToProps)(Nav));