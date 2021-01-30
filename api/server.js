const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const restrict = require('./middleware/index');

// const issuesRouter = require('./issues/issues-router.js');
// const usersRouter = require('./users/users-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// server.use('/api/issues', issuesRouter);
// server.use('/api/users', usersRouter);

module.exports = server;
