const User = require('../users/users-model');

module.exports = {
    registrationPayload,
    loginPayload,
    uniqueEmail,
    validUsername,
}

function registrationPayload(req, res, next) {
    const { first_name, last_name, email, username, password } = req.body;
    if(!first_name || !last_name || !email || !username || !password) {
        res.status(400).json({ message: 'Missing required fields' })
    } else {
        next();
    }
}

function loginPayload(req, res, next) {
    if(!req.body.username || !req.body.password) {
        res.status(400).json({ message: 'Username and password required' })
    } else {
        next();
    }
}

async function uniqueEmail(req, res, next) {
    try {
        const exists = await User.getBy({ email: req.body.email })
        if(!exists.length) {
            next()
        } else {
            res.status(400).json({ message: "An account with this email already exists" })
        }
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

async function validUsername(req, res, next) {
    try {
        const exists = await User.getBy({ username: req.body.username })
        if(exists.length) {
            next()
        } else {
            res.status(400).json({ message: "An account with this username does not exist" })
        }
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}