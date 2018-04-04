import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

class Dashboard extends Component {
  constructor(props){
    super(props)
  }


  render(){
    return (
      <div className="Dashboard">

      Dashboard
      </div>
    );
  }
}

function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps)(Dashboard);