const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cookYield: {
    type: String,
    required: false,
  },
  prepTime: {
    type: String,
    required: false,
  },
  cookTime: {
    type: String,
    required: false,
  },
  ingredients: {
    type: Array,
    required: false,
  },
  directions: {
    type: Array,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  favorite: {
    type: Boolean,
    required: false,
  },
  note: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
module.exports = mongoose.model('Recipe', recipeSchema);
