import {
  UPDATE_ID,
  UPDATE_PROFILE_PICTURE,
  UPDATE_USERNAME
} from './constraints'

export function updateUsername(text){
  return {
      type: UPDATE_USERNAME,
      payload: text
  }
}
export function updateProfilePicture(text){
  return {
      type: UPDATE_PROFILE_PICTURE,
      payload: text
  }
}
export function updateID(text){
  return {
      type: UPDATE_ID,
      payload: text
  }
}
