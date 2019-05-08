import axios from 'axios';

export function changeProfilePic(picURL) {
  axios.patch('/api/change-profile-image', picURL)
}

export function changePassword(newPass) {
  axios.patch('/api/change-password', newPass)
}