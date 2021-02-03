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

router.get("/:id", validID, (req, res) => {
  Issue.getById(req.params.id)
    .then((issue) => {
      res.status(200).json(issue);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id/upvotes", validID, (req, res) => {
  Issue.getUpvotes(req.params.id)
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

router.put("/:id", validBody, validID, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Issue.getById(id)
    .then((issue) => {
      return Issue.change(id, changes);
    })
    .then((updatedIssue) => {
      res.status(201).json(updatedIssue);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put("/:id/upvotes", validID, upvoteCheck, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Issue.getById(id)
    .then((issue) => {
      return Issue.change(id, changes);
    })
    .then((updatedIssue) => {
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
        res.status(404).json({ message: "Could not find issue with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete issue" });
    });
});

function validBody(req, res, next) {
  const { user_id, issue, description, city, state, zipcode } = req.body;
  if (!user_id || !issue || !description || !city || !state || !zipcode) {
    res.status(500).json({ message: "missing required fields" });
  } else {
    next();
  }
}
function upvoteCheck(req, res, next) {
  const { upvotes } = req.body;
  if (Object.keys(req.body).length > 1) {
    res.status(500).json({ message: "Additional fields detected" });
  } else {
    if (!upvotes) {
      res.status(500).json({ message: "Upvotes not found" });
    } else {
      next();
    }
  }
}
async function validID(req, res, next) {
  const id = req.params.id;
  const checkedID = await Issue.getById(id);
  if (checkedID) {
    next();
  } else {
    res.status(404).json({ message: `Issue with id ${id} not found` });
  }
}

module.exports = router;
