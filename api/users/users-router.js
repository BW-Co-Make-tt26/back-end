const router = require("express").Router();
const bcrypt = require("bcrypt");
const Users = require("./users-model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets");
const {
  registrationPayload,
  loginPayload,
  uniqueEmail,
  validUsername,
} = require("../middleware/users-middleware");

router.get("/", (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", (req, res) => {
  Users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/register", registrationPayload, uniqueEmail, (req, res) => {
  const details = req.body;

  const hashedPass = bcrypt.hashSync(details.password, 12);
  details.password = hashedPass;

  Users.add(details)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/login", loginPayload, validUsername, async (req, res) => {
  const { username, password } = req.body;
  try {
    const checkingUser = await Users.getBy({ username }).first();
    if (checkingUser && bcrypt.compareSync(password, checkingUser.password)) {
      const token = generateToken(checkingUser);
      res.json({ message: "welcome back", token });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch {
    res.status(500).json({ message: "username or password incorrect" });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    email: user.email,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
