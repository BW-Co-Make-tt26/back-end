const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted');

const issuesRouter = require('./issues/issues-router.js');
const usersRouter = require('./users/users-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/issues', restrict, issuesRouter);
server.use('/api/users', usersRouter);

server.get("/", (req, res) => {
    res.json("it's alive!");
})

module.exports = server;
