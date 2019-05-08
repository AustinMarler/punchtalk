import axios from 'axios';

export function changeProfilePic(picURL) {
  axios.patch('/profile-image', picURL)
}

export function changePassword(newPass) {
  axios.patch('/user-password', newPass)
}