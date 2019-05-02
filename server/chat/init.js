const initSocket = function(io) {
  io.on("connection", socket => {

    socket.on('new message', text => {
      io.emit('new message', text)
    })

    

  })
}

module.exports = initSocket;