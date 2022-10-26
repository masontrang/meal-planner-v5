const express = require('express');
const createError = require('http-errors');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const mealsRouter = require('./routes/meals');
const groupsRouter = require('./routes/groups');
const router = express.Router();

router.use('/users', usersRouter);
router.use('/recipes', recipesRouter);
router.use('/meals', mealsRouter);
router.use('/groups', groupsRouter);

router.use((req, res, next) => {
  next(createError(404));
});

module.exports = router;
