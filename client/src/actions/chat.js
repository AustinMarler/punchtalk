import store from '../store'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001");

export function sendMessage(message) {
  socket.emit("new message", message);
}

socket.on('new message', message => {
  store.dispatch({
    type: "ADD_MESSAGE",
    payload: message
  })
})