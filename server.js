var server = require('pushstate-server');

server.start({
  port: process.env.PORT || 3000,
  directory: './demo'
});