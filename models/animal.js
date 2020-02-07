var mongoose = require("mongoose");

var animalSchema = new mongoose.Schema({
  name: String,
  image: String,
  disease: String,
  symptoms: String,
  no_of_days: Number,
  description: String,
  breed: String,
  village: String,
  district: String,
  state: String,
  pincode: Number,
  medicine_used: String,
  medicine_type: String,

  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Animal", animalSchema);
