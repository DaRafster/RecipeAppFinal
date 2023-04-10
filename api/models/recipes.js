const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  favorite: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
});

const recipe = mongoose.model("recipe", recipeSchema);

module.exports = recipe;
