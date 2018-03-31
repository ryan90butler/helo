import {UPDATE_ID, UPDATE_PROFILE_PICTURE, UPDATE_USERNAME} from './constraints';
import { combineReducers } from 'redux';

// const initialState={
//   username: '',
//   id: '',
//   profilePicture: ''
// }

// function reducers (state = initialState, action){
//   switch(action.type){
//     case UPDATE_ID:
//     return action.payload;
//     case UPDATE_PROFILE_PICTURE:
//     return action.payload;
//     case UPDATE_USERNAME:
//     return action.payload;
//   }
// }

function updateUsername(state = '',action){
  if(action.type === UPDATE_USERNAME){
    return action.payload
  }
  return state;
};
function updateID(state = '',action){
  if(action.type === UPDATE_ID){
    return action.payload
  }
  return state;
};
function updateProfilePicture(state = '',action){
  if(action.type === UPDATE_PROFILE_PICTURE){
    return action.payload
  }
  return state;
};

const rootReducer = combineReducers({updateID,updateProfilePicture,updateUsername});

export default rootReducer;