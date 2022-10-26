import './App.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import MealPlanner from './components/MealPlanner';
import AddRecipes from './components/AddRecipes';
import ViewRecipes from './components/ViewRecipes';
import ViewRecipe from './components/ViewRecipe';
import Collaborate from './components/Collaborate';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Login from './components/Login';
import Logout from './components/Logout';
import SignUp from './components/SignUp';
import Preferences from './components/Preferences';
import ViewMeal from './components/ViewMeal';
export const DetailsContext = React.createContext();

function App() {
  const [user, setUser] = useState('');
  const [group, setGroup] = useState('');
  const [meals, setMeals] = useState(['sdfa']);
  const [recipes, setRecipes] = useState([]);
  const [viewRecipeIndex, setViewRecipeIndex] = useState(0);
  const [recipesLength, setRecipesLength] = useState(0);
  const [dateArray, setDateArray] = useState([]);
  const [selectedMealTime, setSelectedMealTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMealId, setSelectedMealId] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayedRecipe, setDisplayedRecipe] = useState('');

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '/mealplanner',
      element: <MealPlanner />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/meals/*',
      element: <MealPlanner />,
    },
    {
      path: '/addrecipes',
      element: <AddRecipes />,
    },
    {
      path: '/viewrecipes',
      element: <ViewRecipes />,
    },
    {
      path: '/viewrecipe/*',
      element: <ViewRecipe />,
    },
    {
      path: '/collaborate',
      element: <Collaborate />,
    },
    {
      path: '/preferences',
      element: <Preferences />,
    },
    {
      path: '/viewmeal/*',
      element: <ViewMeal />,
    },
  ]);
  return (
    <React.StrictMode>
      {' '}
      <DetailsContext.Provider
        value={{
          user,
          setUser,
          group,
          setGroup,
          meals,
          setMeals,
          recipes,
          setRecipes,
          viewRecipeIndex,
          setViewRecipeIndex,
          recipesLength,
          setRecipesLength,
          dateArray,
          selectedMealTime,
          setSelectedMealTime,
          selectedDate,
          setSelectedDate,
          selectedMealId,
          setSelectedMealId,
          selectedIndex,
          setSelectedIndex,
          displayedRecipe,
          setDisplayedRecipe,
        }}
      >
        <NavBar></NavBar>

        <RouterProvider router={router} />
      </DetailsContext.Provider>
    </React.StrictMode>
  );
}

export default App;
