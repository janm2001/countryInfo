const express = require("express");
const router = express.Router();
const {
  getBlog,
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} = require("../controller/blogController");

// Routes

// GET All blogs
router.get("/", getBlogs);

// GET a single Blog
router.get("/:id", getBlog);

// POST a new Blog
router.post("/", createBlog);

// DELETE a Blog
router.delete("/:id", deleteBlog);

// UPDATE a Blog
router.patch("/:id", updateBlog);

module.exports = router;
