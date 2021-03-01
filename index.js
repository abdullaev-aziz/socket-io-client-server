const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//fetching memes
const axios = require('axios').default;



//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg)
      axios.get('https://api.imgflip.com/get_memes')
      .then(res => res.data)
      .then(data => console.log(data.data.memes))
      .catch(err => console.log('fetching memes error', err))
    });

    socket.on('user typing', ()=> {
        io.emit('user typing')
    })
  });



http.listen(3000, () => {
  console.log('listening on *:3000');
});