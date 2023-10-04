const Blog = require("../model/Blog");
const mongoose = require("mongoose");

//get all cities
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });

  res.status(200).json(blogs);
};

//get a single Blog
const getBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Blog" });
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ error: "No such Blog" });
  }

  res.status(200).json(blog);
};

// Create a new Blog
const createBlog = async (req, res) => {
  const { title, description, city } = req.body;

  // Check if all required fields are provided
  console.log(title, description, city);
  if (!title || !description || !city) {
    return res
      .status(400)
      .json({ error: "Please fill all the required fields" });
  }

  try {
    const blog = await Blog.create({
      title,
      description,
      city,
    });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a Blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Blog" });
  }

  const blog = await Blog.findOneAndDelete({ _id: id });

  if (!blog) {
    return res.status(404).json({ error: "No such Blog" });
  }

  res.status(200).json(blog);
};

//update a Blog
const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Blog" });
  }

  const blog = await Blog.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!blog) {
    return res.status(404).json({ error: "No such Blog" });
  }

  res.status(200).json(blog);
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
};
