const router = require("express").Router();
const Issue = require("./issues-model");

router.get("/", (req, res) => {
  Issue.get()
    .then((issue) => {
      res.status(200).json(issue);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", (req, res) => {
  Issue.getById(req.params.id)
    .then((issue) => {
      res.status(200).json(issue);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", validBody, (req, res) => {
  Issue.add(req.body)
    .then((newIssue) => {
      res.status(201).json(newIssue);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put("/:id", validBody, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Issue.getById(id)
    .then(issue => {
      if(issue){
        return Issue.change(id, changes)
      } else {
        res.status(404).json({ message: `Could not find issue with id ${id}` });
      }
    })
    .then(updatedIssue => {
      res.status(201).json(updatedIssue);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", (req, res) => {
  Issue.remove(req.params.id)
    .then((deleted) => {
      if (deleted) {
        res.json({
          message: `Issue with id ${req.params.id} has been deleted`,
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find issue with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete issue" });
    });
});

function validBody(req, res, next) {
  const { user_id, issue, description, city, state, zipcode } = req.body;
  if (!user_id || !issue || !description || !city || !state || !zipcode) {
    res.status(500).json({ message: "missing require fields" });
  } else {
    next();
  }
}

module.exports = router;
