// Import Socket.IO
const socket = io();

// connects to the server
socket.on('connect', () => {
  console.log('Connected to the server');
  // This will get the count from the server
  socket.on('visitor', (count) => {
    console.log(`There are ${count} visitors on the site`);
  });
});