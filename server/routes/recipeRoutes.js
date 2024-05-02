const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

/*
    App Routes
*/
router.get("/", recipeController.homepage);

/*
    GET /categories
    Categories
*/
router.get("/categories", recipeController.exploreCategories);

/*
    GET /recipes
    Recipes
*/
router.get("/recipe/:id", recipeController.exploreRecipe);


module.exports = router;