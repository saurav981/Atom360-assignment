const AuthorModel = require("../models/authorModel");

exports.getAllAuthors = async (req, res) => {
  try {
    const author = await AuthorModel.find().sort({ createdAt: -1 });
    res.status(200).json(author);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.createAuthor = async (req, res) => {
  try {
    const author = await AuthorModel.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.getAuthor = async (req, res) => {
  try {
    const author = await AuthorModel.findById(req.params.id);
    res.status(200).json(author);
  } catch (error) {
    console.log(error);
    res.status(400).json("error fetching author");
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const author = await AuthorModel.findByIdAndUpdate(req.params.id, req.body);
    if (!author) {
      return "No author found with this Id";
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json("Update failed");
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const author = await AuthorModel.findByIdAndDelete(req.params.id);
    if (!author) {
      return "No author found with this Id";
    }
    res.status(204).json(null);
  } catch (error) {
    res.status(500).json("Delete failed");
  }
};
