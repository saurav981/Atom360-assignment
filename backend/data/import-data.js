const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AuthorModel = require("../models/authorModel");

dotenv.config();

// Connecting to database / Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection successful!"));

// Read json file
const authors = JSON.parse(
  fs.readFileSync(`${__dirname}/authors.json`, "utf-8")
);

// Import data into database
const importData = async () => {
  try {
    await AuthorModel.create(authors);
    console.log("Data successfully loaded!");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// Delete all data from collection/database
const deleteData = async () => {
  try {
    await AuthorModel.deleteMany();
    console.log("Data successfully deleted!");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
