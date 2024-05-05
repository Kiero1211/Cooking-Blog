const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// GET
router.get("/", recipeController.homepage);
router.get("/categories", recipeController.exploreCategories);
router.get("/recipe/:id", recipeController.exploreRecipe);
router.get("/categories/:name", recipeController.exploreCategoriesById);
router.get("/explore-latest", recipeController.exploreLatest);
router.get("/explore-random", recipeController.exploreRandom);
router.get("/submit-recipe", recipeController.submitRecipe);

// POST
router.post("/submit-recipe", recipeController.submitRecipeOnPOST);
router.post("/search", recipeController.search);
router.post("/delete-recipe", recipeController.deleteRecipe);


module.exports = router;