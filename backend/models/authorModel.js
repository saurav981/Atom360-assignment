const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    image: String,
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
    },
    category: String,
    status: {
      type: Boolean,
      default: true,
    },
    employed: {
      type: Date,
    },
  },
  { timestamps: true }
);

const images = [
  "https://demos.creative-tim.com/soft-ui-dashboard/assets/img/team-1.jpg",
  "https://demos.creative-tim.com/soft-ui-dashboard/assets/img/team-2.jpg",
  "https://demos.creative-tim.com/soft-ui-dashboard/assets/img/team-3.jpg",
  "https://demos.creative-tim.com/soft-ui-dashboard/assets/img/team-4.jpg",
];

AuthorSchema.pre("save", function (next) {
  this.image = images[Math.floor(Math.random() * 3) + 1];
  next();
});

const AuthorModel = mongoose.model("Author", AuthorSchema);

module.exports = AuthorModel;
