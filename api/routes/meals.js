const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

//Meals
router.use(protect);
router.post('/getMeals', async (req, res) => {
  const userID = req.user._id;
  let startDate = new Date(req.body.startDate);

  startDate.setUTCHours(0);
  let endDate = new Date();
  endDate.setDate(startDate.getDate() + 6);
  endDate.setUTCHours(0);
  startDate = startDate.toISOString();
  endDate = endDate.toISOString();

  console.log('getStart', startDate);
  console.log('getEnd', endDate);

  let foundMeals = [];
  if (!req.user.group) {
    foundMeals = await Meal.find({
      user: userID,
      date: { $gte: startDate, $lte: endDate },
    })
      .populate('breakfast')
      .populate('lunch')
      .populate('dinner');
  } else {
    const groupID = req.user.group._id;
    foundMeals = await Meal.find({
      group: groupID,
      date: { $gte: startDate, $lte: endDate },
    })
      .populate('breakfast')
      .populate('lunch')
      .populate('dinner');
  }

  res.send(JSON.stringify(foundMeals));
});

//url parameters
router.post('/viewmeals/:year/:month/:day/:mealTime', async (req, res) => {
  const { year, month, day, mealTime } = req.params;
  const parseDate = Date.parse(`${year}-${month}-${day}`);
  const date = new Date(parseDate);
  console.log('viewMeals', date);
  date.setUTCHours(0);
  date.toISOString();
  // date.setHours(0, 0, 0, 0);
  // date.toISOString();
  console.log('viewMeals2', date);
  let foundMeals = [];
  try {
    if (!req.user.group) {
      foundMeals = await Meal.find({
        user: req.user._id,
        date: date,
      })
        .populate({
          path: 'breakfast',
          populate: { path: 'user', model: User, select: 'user' },
        })
        .populate({
          path: 'lunch',
          populate: { path: 'user', model: User, select: 'user' },
        })
        .populate({
          path: 'dinner',
          populate: { path: 'user', model: User, select: 'user' },
        });
      console.log('foundMeals', foundMeals);
    } else {
      const groupID = req.user.group._id;

      foundMeals = await Meal.find({
        group: groupID,
        date: date,
      })
        .populate({
          path: 'breakfast',
          populate: { path: 'user', model: User, select: 'user' },
        })
        .populate({
          path: 'lunch',
          populate: { path: 'user', model: User, select: 'user' },
        })
        .populate({
          path: 'dinner',
          populate: { path: 'user', model: User, select: 'user' },
        });
    }
    res.send(JSON.stringify(foundMeals[0][mealTime]));
  } catch (e) {
    console.log('log e', e);
    return res.status(200).json({
      message: 'failed to fetch meals',
    });
  }
});

router.post('/addMeal', async (req, res) => {
  let date = new Date(req.body.date);

  // date = date.toISOString();

  console.log('addMeal', date);
  const recipeId = req.body.recipeId;
  const mealTime = req.body.mealTime;
  const userID = req.user._id;

  date.setUTCHours(0);
  // date.toISOString();
  // date.setHours(0, 0, 0, 0);
  // date.toISOString();
  if (!req.user.group) {
    const mealDay = await Meal.findOne({
      $and: [{ date: date }, { user: userID }],
    });

    try {
      if (!mealDay) {
        const newMeal = new Meal({
          date: date,
          user: userID,
          [mealTime]: [recipeId],
        });

        await newMeal.save();
        return res.status(200).json({
          message: ' added meal to new day',
        });
      } else {
        const newMeal = await Meal.updateOne(
          { $and: [{ date: date }, { user: userID }] },
          { $push: { [mealTime]: [recipeId] } }
        );

        return res.status(200).json({
          message: ' added meal to existing day',
        });
      }
    } catch {
      return res.status(200).json({
        message: 'failed to submit',
      });
    }
  } else {
    const groupID = req.user.group._id;
    const mealDay = await Meal.findOne({
      $and: [{ date: date }, { group: groupID }],
    });
    try {
      if (!mealDay) {
        const newMeal = new Meal({
          date: date,
          group: groupID,
          [mealTime]: [recipeId],
        });
        await newMeal.save();
        return res.status(200).json({
          message: ' added meal to new day',
        });
      } else {
        const newMeal = await Meal.updateOne(
          { $and: [{ date: date }, { group: groupID }] },
          { $push: { [mealTime]: [recipeId] } }
        );

        return res.status(200).json({
          message: ' added meal to existing day',
        });
      }
    } catch {
      return res.status(200).json({
        message: 'failed to submit',
      });
    }
  }
});

router.delete('/deletemeal/:year/:month/:day/:mealTime', async (req, res) => {
  const { year, month, day, mealTime } = req.params;
  const parseDate = Date.parse(`${year}-${month}-${day}`);
  let date = new Date(parseDate);
  // date.setUTCHours(0);
  // date = date.toISOString();
  const userID = req.user._id;

  const mealId = req.body.mealId;
  const recipeId = req.body.recipeId;
  if (!req.user.group) {
    try {
      const mealDay = await Meal.findOne({
        $and: [{ date: date }, { user: userID }],
      })
        .populate('breakfast')
        .populate('lunch')
        .populate('dinner');
      const arrayToUpdate = mealDay[mealTime];
      const found = arrayToUpdate.find((meal) => meal._id == recipeId);
      const foundIndex = arrayToUpdate.indexOf(found);
      arrayToUpdate.splice(foundIndex, 1);
      const mealDay2 = await Meal.findById(mealId)
        .populate('breakfast')
        .populate('lunch')
        .populate('dinner');
      await mealDay2.updateOne({ [mealTime]: arrayToUpdate });
      return res.status(200).json({
        message: 'Deleted Meal from Individual Plan',
      });
    } catch {
      return res.status(200).json({
        message: 'Delete Meal from Individual Plan Unsuccessful',
      });
    }
  } else {
    try {
      const groupID = req.user.group._id;
      const mealDay = await Meal.findOne({
        $and: [{ date: date }, { group: groupID }],
      })
        .populate('breakfast')
        .populate('lunch')
        .populate('dinner');
      const arrayToUpdate = mealDay[mealTime];
      const found = arrayToUpdate.find((meal) => meal._id == recipeId);
      const foundIndex = arrayToUpdate.indexOf(found);
      arrayToUpdate.splice(foundIndex, 1);
      const mealDay2 = await Meal.findById(mealId)
        .populate('breakfast')
        .populate('lunch')
        .populate('dinner');
      await mealDay2.updateOne({ [mealTime]: arrayToUpdate });
      return res.status(200).json({
        message: 'Deleted Meal from Group Plan',
      });
    } catch {
      return res.status(200).json({
        message: 'Delete Meal from Group Plan Unsuccessful',
      });
    }
  }
});

module.exports = router;
