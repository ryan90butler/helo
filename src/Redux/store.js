import {
  UPDATE_ID,
  UPDATE_PROFILE_PICTURE,
  UPDATE_USERNAME
} from './constraints';
import axios from 'axios';

export function updateUsername(text){
  return {
      type: UPDATE_USERNAME,
      payload: text
  }
}

export function updateProfilePicture(){
  return axios.get('/api/profilePic');
}


export function updateID(text){
  return {
      type: UPDATE_ID,
      payload: text
  }
}
