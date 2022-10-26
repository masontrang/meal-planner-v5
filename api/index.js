const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();
// const server = app.listen(8080, () => {
//   console.info(`Listening to port ${8080}`);
// });

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(8080);
    console.log('Database is connected to local host 8080');
  })
  .catch((err) => console.log(err));

const exitHandler = () => {
  // if (server) {
  //   server.close(() => {
  //     console.info('Server closed');
  //     process.exit(1);
  //   });
  // } else {
  //   process.exit(1);
  // }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  if (server) {
    server.close();
  }
});


