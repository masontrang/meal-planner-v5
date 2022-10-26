const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Group = require('../models/Group');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.post('/AddRecipe', async (req, res) => {
  const recipe = req.body;
  const userID = req.user._id;

  try {
    const existingRecipe = await Recipe.findOne({
      $and: [{ name: recipe.name }, { user: userID }],
    });
    if (existingRecipe) {
      return res.status(400).json({
        message:
          'Recipe with same name already exists in recipe libary. Please enter a unique recipe name',
      });
    } else {
      const newRecipe = new Recipe({
        name: recipe.name,
        cookYield: recipe.cookYield,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        ingredients: recipe.ingredients,
        directions: recipe.directions,
        url: recipe.url,
        favorite: recipe.favorite,
        photo: recipe.photo,
        note: recipe.note,
        user: userID,
      });
      await newRecipe.save();
      return res.status(200).json({
        message: newRecipe.name + ' successfully added to recipe library',
      });
    }
  } catch {
    return res.status(400).json({
      message: 'Add recipe failed, please try again',
    });
  }
});

router.get('/AllRecipes', async (req, res) => {
  let recipes = [];
  if (!req.user.group) {
    recipes = await Recipe.find({ user: req.user._id }).populate(
      'user',
      'user'
    );
  } else {
    const groupID = req.user.group._id;
    const group = await Group.findById(groupID);
    const groupUsers = group.groupUsers;
    recipes = await Recipe.find({ user: { $in: groupUsers } }).populate(
      'user',
      'user'
    );
  }
  res.send(JSON.stringify(recipes));
});

router.get('/viewrecipe/:recipeId', async (req, res) => {
  let recipe = {};
  if (!req.user.group) {
    const recipeId = req.params.recipeId;

    recipe = await Recipe.findOne({
      $and: [{ _id: recipeId }, { user: req.user._id }],
    }).populate('user', 'user');
  } else {
    const groupID = req.user.group._id;
    const recipeId = req.params.recipeId;
    const group = await Group.findById(groupID);
    const groupUsers = group.groupUsers;
    recipe = await Recipe.findOne({
      $and: [{ _id: recipeId }, { user: { $in: groupUsers } }],
    }).populate('user', 'user');
  }

  res.send(JSON.stringify(recipe));
});

router.put('/updaterecipe/:recipeId', async (req, res) => {
  const updatedRecipe = req.body;
  const recipe = await Recipe.findById(req.params.recipeId).populate(
    'user',
    'user'
  );
  if (recipe.user._id.toString() === req.user._id.toString()) {
    try {
      await recipe.updateOne({
        name: updatedRecipe.name,
        cookYield: updatedRecipe.cookYield,
        prepTime: updatedRecipe.prepTime,
        cookTime: updatedRecipe.cookTime,
        ingredients: updatedRecipe.ingredients,
        directions: updatedRecipe.directions,
        photo: updatedRecipe.photo,
        url: updatedRecipe.url,
        favorite: updatedRecipe.favorite,
        note: updatedRecipe.note,
      });
      return res.status(200).json({
        message:
          updatedRecipe.name + ' recipe successfully updated in recipe library',
      });
    } catch {
      return res.status(400).json({
        message: 'Edit recipe failed, please try again',
      });
    }
  } else {
    return res.status(401).json({
      message:
        'Not authorized to edit recipe (Recipe Added By ' +
        recipe.user.user +
        ')',
    });
  }
});

router.delete('/deleterecipe/:recipeId', async (req, res) => {
  const deleteRecipeID = req.params.recipeId;
  const userID = req.user._id;
  const deleteRecipeName = req.body.name;
  const recipe = await Recipe.findById(req.params.recipeId);
  if (recipe.user.toString() == req.user._id) {
    try {
      await Recipe.deleteOne({
        $and: [{ _id: deleteRecipeID }, { user: userID }],
      });

      return res.status(200).json({
        message:
          deleteRecipeName + ' recipe successfully deleted from recipe library',
      });
    } catch {
      return res.status(401).json({
        message: 'Failed to delete recipe from recipe library',
      });
    }
  } else {
    return res.status(400).json({
      message:
        'Not Authorized to delete ' +
        deleteRecipeName +
        ' from Group Recipe Library',
    });
  }
});

module.exports = router;
