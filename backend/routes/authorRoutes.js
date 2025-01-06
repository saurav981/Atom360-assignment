const express = require("express");
const authorController = require("../controllers/authorController");

const router = express.Router();

// Create, Read
router
  .route("/")
  .get(authorController.getAllAuthors)
  .post(authorController.createAuthor);

// Update, Delete
router
  .route("/:id")
  .get(authorController.getAuthor)
  .patch(authorController.updateAuthor)
  .delete(authorController.deleteAuthor);

module.exports = router;
