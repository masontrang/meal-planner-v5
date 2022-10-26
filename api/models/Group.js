const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  joinCode: {
    type: String,
    required: false,
  },
  groupUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  ],
  // groupMeals: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Meal',
  //     required: false,
  //   },
  // ],
  // groupRecipes: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Recipe',
  //     required: false,
  //   },
  // ],
});
module.exports = mongoose.model('Group', groupSchema);
