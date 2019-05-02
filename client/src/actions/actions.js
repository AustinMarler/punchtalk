import store from '../store'
import io from 'socket.io-client'

const socket = io.connect("http://10.68.0.155:3001");

export function send(text) {
  socket.emit("new message", text);
}

socket.on('new message', text => {
  store.dispatch({
    type: "ADD_MESSAGE",
    payload: text
  })
})

