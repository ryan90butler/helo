import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      myPost: true,
  };
  this.handleChange = this.handleChange.bind(this)
  this.myPostChange = this.myPostChange.bind(this)
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value,
    });
  }

  myPostChange(){
    if (this.state.myPost == false){
    this.setState({
      myPost: true,
    });}
    else{
      this.setState({myPost: false})
    }
  }

  // componentWillMount() {
  //   axios.get(`/api/posts/` + this.props.match.params.id)
  //     .then(response => {
  //       this.setState({
  //         bins: response.data
  //       })
  //     })
  // }

  render(){
    console.log(this.props)
    return (
      <div className="Dashboard">

      Dashboard
      <div className="search-box">
      <input name="search" type="text" placeholder="Search by Title" value={this.state.password} onChange={this.handleChange}/>
      <button type="submit">Search</button>
      <button type="submit">Reset</button>
      <p className="my-post-box">My Posts</p>
      <button type="checkbox" onClick={this.myPostChange}/>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps)(Dashboard);